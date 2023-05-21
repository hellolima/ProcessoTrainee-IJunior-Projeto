import { Router, Request, Response, NextFunction } from 'express';
import { ArtistaServices } from '../services/ArtistaServices'
import { errorHandler } from "../../../middlewares/errorHandler";
import{loginMiddleware,
    verifyJWT,
    checkRole,
    notLoggedIn} from '../../../middlewares/authMiddlewares';
import { cargoUsuario } from '../../../../constants/cargoUsuario';
import { Artista } from "../models/Artista";
import { checkParams } from '../../../middlewares/checkParams';

export const router = Router();

//Adiciona um artista ao banco de dados
router.post('/criar', 
    //checkParams("Artista"), 
    async(req: Request, res: Response, next: NextFunction) =>{
    const body = req.body;
    try{
        await ArtistaServices.criar(body);
        res.status(201).json('Artista criado com sucesso!');
    }catch(erro){
        next(erro);
    }
});

//Lista todas as músicas de um artista pelo id do artista
router.get("/listarArtista",
    async(req: Request, res: Response, next: NextFunction) => {
    const _id = req.body.id;
    try {
        const musicas = await ArtistaServices.listarArtista(_id);
        res.status(200).json(musicas);
    }catch(erro){
        next(erro);
    }
});

//Atualiza as informações de um artista no banco de dados
router.put("/atualizar", 
    checkRole(cargoUsuario.ADMIN),
    //checkParams("Artista"), 
    async(req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try{
        await ArtistaServices.atualizar(body);
        res.status(200).json("Artista atualizado");
    }catch(erro){
        next(erro);
    }
});

//Remove um artista e todas as músicas dele do banco de dados
router.delete("/remover", 
    checkRole(cargoUsuario.ADMIN), 
    async(req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    try{
        await ArtistaServices.remover(id);
        res.status(200).json("Artista removido");
    }catch(erro){
        next(erro);
    }
})

router.use(errorHandler);

module.exports = router;