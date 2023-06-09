import jwt, { JwtPayload } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Usuario } from '../domains/usuarios/models/Usuario';
import { PermissionError } from "../../errors/PermissionError";
import { Request, Response, NextFunction } from 'express';
import { PayloadParams } from '../domains/usuarios/types/PayloadParams';
import { getEnv } from '../../utils/functions/getEnv';

//********** tirar esse usuario(a funcao deve receber um parametro so) e trabalhar com usuario trabalhando com req.user
export const checkRole = (cargos: string) => { 
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cargo = (req as any).usuario!.cargo;
            if(!cargos.includes(cargo)){
                throw new PermissionError("Acesso não autorizado");
            } next();
        } catch(erro){
            next(erro);
        }
    }
};

function generateJWT(usuario: PayloadParams, res: Response){
    const body = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
    };

    const token = jwt.sign({ usuario: body}, getEnv('SECRET_KEY'), { expiresIn: getEnv('JWT_EXPIRATION')});

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: getEnv('NODE_ENV') !== 'development',
    });
};

export async function loginMiddleware(req: Request, res: Response, next: NextFunction){
    try{
        const usuario = await Usuario.findOne({where: {email: req.body.email}});

        if(!usuario){
            throw new PermissionError('E-mail e/ou senha incorretos');
        } else{
            const matchingSenha = await compare(req.body.senha, usuario.senha);

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

function cookieExtractor(req: Request){
    let token = null;

    if(req && req.cookies){
        token = req.cookies['jwt'];
    }

    return token;
}

export function verifyJWT(usuario: PayloadParams, req: Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);
        if(token){
            const decodificado = jwt.verify(token, getEnv('SECRET_KEY')) as JwtPayload;
            usuario = decodificado.usuario;
        }
        if(!usuario){
            throw new PermissionError('Você precisa estar logado para realizar essa ação!');
        } next();
    } catch (error) {
        next(error);
    }
};

export async function notLoggedIn(req: Request, res: Response, next: NextFunction){ 
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