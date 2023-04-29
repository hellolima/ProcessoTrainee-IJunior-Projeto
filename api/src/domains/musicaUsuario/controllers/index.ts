import { Router, Request, Response, NextFunction } from 'express';
import { musicaUsuarioServices } from '../services/musicaUsuarioServices'
import { errorHandler } from "../../../middlewares/errorHandler";
import{loginMiddleware,
    verifyJWT,
    checkRole,
    notLoggedIn} from '../../../middlewares/authMiddlewares';
import { musicaUsuario } from "../models/musicaUsuario";
import { checkParams } from '../../../middlewares/checkParams';

export const router = Router();

//Relaciona uma música a um usuário.
router.post('/criar', 
    checkParams("musicaUsuario"), 
    async(req: Request, res: Response, next: NextFunction) =>{
    const body = req.body;
    try{
        await musicaUsuarioServices.criar(body);
        return res.status(201).json('Agora você escuta musicas!');
    }catch(erro){
        next(erro);
    }
});

//Lista todas as músicas que um usuário escuta
router.get("/listarUsuario", async(req: Request, res: Response, next: NextFunction) => {
    const _UsuarioId = req.body.UsuarioId;
    const musicas = await musicaUsuarioServices.listarUsuario(_UsuarioId);
    try {
        res.status(200).json(musicas);
    }catch(erro){
        next(erro);
    }
});

router.use(errorHandler);

module.exports = router;