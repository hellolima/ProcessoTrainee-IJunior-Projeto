const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../domains/usuarios/models/Usuario');
const PermissionError = require("../../errors/PermissionError");

const checkRole = (cargos) => { 
    return async (req, res, next) => {
        try {
            const cargo = await req.usuario.cargo;
            if(!cargos.include(cargo)){
                throw new PermissionError("Acesso não autorizado");
            } next();
        } catch(erro){
            next(erro);
        }
    }
};

function generateJWT(usuario, res){
    const body = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
    };

    const token = jwt.sign({ usuario: body}, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION});

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
};

async function loginMiddleware(req, res, next){
    try{
        const usuario = await Usuario.findOne({where: {email: req.body.email}});

        if(!usuario){
            throw new PermissionError('E-mail e/ou senha incorretos');
        } else{
            const matchingSenha = await bcrypt.compare(req.body.senha, usuario.senha);

            if(!matchingSenha){
                throw new PermissionError('E-mail e/ou senha incorretos');
            }
        }

        generateJWT(usuario, res);

        res.status(200).end();
    } catch(error){
        next(error);
    }
}; 

function cookieExtractor(req){
    let token = null;

    if(req && req.cookies){
        token = req.cookies['jwt'];
    }

    return token;
}

function verifyJWT(req, res, next){
    try {
        const token = cookieExtractor(req);
        if(token){
            const decodificado = jwt.verify(token, process.env.SECRET_KEY);
            req.usuario = decodificado.usuario;
        }
        if(!req.usuario){
            throw new PermissionError('Você precisa estar logado para realizar essa ação!');
        } next();
    } catch (error) {
        next(error);
    }
};

async function notLoggedIn(req, res, next){ 
    try{ 
        const token = cookieExtractor(req); 
        if(token){ 
            throw new Error('Você já está logado!'); 
        } 
        next(); 
    } 
    catch(error){ 
        next(error); 
    }};

module.exports = {loginMiddleware,
    verifyJWT,
    checkRole,
    notLoggedIn};