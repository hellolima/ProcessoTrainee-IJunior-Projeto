import { Router, Request, Response, NextFunction } from 'express';
import { UsuarioServices } from '../services/UsuarioServices';
import { loginMiddleware,
  verifyJWT,
  checkRole,
  notLoggedIn } from '../../../middlewares/auth-middlewares';
import { cargosUsuarios } from '../../usuarios/constants/cargosUsuarios';


export const router = Router();

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
        await UsuarioServices.criar(body);
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
        await UsuarioServices.atualizar(req.params.id, body, req.usuario);
        res.status(200).json("Usuário atualizado");
    } catch(error) {
        next(error);
    }
});

//Deleta um usuário do banco de dados.
router.delete("/remover", 
    verifyJWT,
    async(req, res, next) => {
    const id = req.body.id;
    try{
        await UsuarioServices.remover(id);
        res.status(200).json("Usuário excluído");
    } catch(error) {
        next(error);
    }
}); 
