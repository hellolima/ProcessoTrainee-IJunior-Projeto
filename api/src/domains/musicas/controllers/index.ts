import { Router, Request, Response, NextFunction } from 'express';
import { MusicaServices } from '../services/MusicaServices'
import { errorHandler } from "../../../middlewares/errorHandler";
import{loginMiddleware,
    verifyJWT,
    checkRole,
    notLoggedIn} from '../../../middlewares/authMiddlewares';
import { cargoUsuario } from '../../../../constants/cargoUsuario';
import { Musica } from "../models/Musica";
import { checkParams } from '../../../middlewares/checkParams';

export const router = Router();

//Adiciona uma música ao banco de dados
router.post('/criar', 
    checkParams("Musica"),
    async(req: Request, res: Response, next: NextFunction) =>{
    try{
        await MusicaServices.criar(req.body);
        res.status(201).json('Música criada com sucesso!');
    }catch(erro){
        next(erro);
    }
});

//Lista todas as músicas no banco de dados
router.get("/listarTodas", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const musicas = await MusicaServices.listarTodas();
        res.status(200).json(musicas);
    } catch(erro) {
        next(erro);
    }
});

//Filtra o banco de dados pelo id passado
router.get("/listarID", async(req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    try{
        const musicas = await MusicaServices.filtrarID(id);
        res.status(200).json(musicas);
    } catch(error) {
        return next(error);
    }
});

//Pegar um artista pelo id da musica
router.get("/pegarArtista", async(req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    try {
        const artista = await MusicaServices.pegarArtista(id);
        res.status(200).json(artista);
    }catch(erro){
        next(erro);
    }
});

//Atualiza as informações de uma música no banco de dados
router.put("/atualizar", 
    checkRole(cargoUsuario.ADMIN),
    checkParams("Musica"), 
    async(req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
        await MusicaServices.atualizar(body);
        res.status(200).json("Música atualizada");
    } catch(erro) {
        next(erro);
    }
});

//Remove uma música do banco de dados pelo id
router.delete("/remover", 
    checkRole(cargoUsuario.ADMIN), 
    async(req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    try{
        await MusicaServices.remover(id);
        res.status(200).json("Música removida");
    }catch(erro){
        next(erro);
    }
});

router.use(errorHandler);

module.exports = router;