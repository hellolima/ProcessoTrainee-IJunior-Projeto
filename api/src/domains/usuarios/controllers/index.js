const UsuarioService = require('../services/UsuarioServices');
const router = require('express').Router();
const {loginMiddleware,
    verifyJWT,
    checkRole,
    notLoggedIn} = require('../../../middlewares/authMiddlewares');
const errorHandler = require("../../../middlewares/errorHandler");
const checkParams = require("../../../middlewares/checkParams");

router.post('/login', notLoggedIn, loginMiddleware);

//Realiza o logout limpando o cookie
router.post('/logout',
    verifyJWT,
    async (req, res, next) => {
        try {
            res.clearCookie('jwt');
            res.status(200).json('Logout realizado com sucesso');
        } catch (error) {
            next(error)
        }
    });

//Adiciona um usuário ao banco de dados
router.post('/criar', 
    checkParams("Usuario"), 
    async(req, res, next) =>{
    const body = req.body;
    try{
        await UsuarioService.criar(body);
        res.status(201).json('Usuario criado com sucesso!');
    }catch(error){
        next(error);
    }
});

//Atualiza as informações de um usuário no banco de dados
router.put("/atualizar/:id",
    verifyJWT,
    checkParams("Usuario"),
    async(req, res, next) => {
    const body = req.body;
    try {
        await UsuarioService.atualizar(req.params.id, body, req.usuario);
        res.status(200).json("Usuário atualizado");
    } catch(error) {
        next(error);
    }
});

//Deleta um usuário do banco de dados.
router.delete("/remover", async(req, res, next) => {
    const id = req.body.id;
    try{
        await UsuarioService.remover(id);
        res.status(200).json("Usuário excluído");
    } catch(error) {
        next(error);
    }
}); 

router.use(errorHandler);

module.exports = router;