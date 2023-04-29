import { Router, Request, Response, NextFunction } from 'express';
import { ArtistasServices } from '../services/ArtistasServices';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { cargosUsuarios } from '../../usuarios/constants/cargosUsuarios';


export const router = Router();

//Adiciona um artista ao banco de dados
router.post('/criar',
    verifyJWT,
    checkRole(cargosUsuarios.ADMIN),
    checkParams("Artista"), 
    async(req, res, next) =>{
    const body = req.body;
    try{
        await ArtistasServices.criar(body);
        res.status(201).json('Artista criado com sucesso!');
    }catch(erro){
        next(erro);
    }
});

//Lista todas as músicas de um artista pelo id do artista
router.get("/listarArtista",
    verifyJWT,
    async(req, res, next) => {
    const _id = req.body.id;
    try {
        const musicas = await ArtistasServices.listarArtista(_id);
        res.status(200).json(musicas);
    }catch(erro){
        next(erro);
    }
});

//Atualiza as informações de um artista no banco de dados
router.put("/atualizar", 
    verifyJWT,
    checkRole(cargosUsuarios.ADMIN),
    checkParams("Artista"), 
    async(req, res, next) => {
    const body = req.body;
    try{
        await ArtistasServices.atualizar(body);
        res.status(200).json("Artista atualizado");
    }catch(erro){
        next(erro);
    }
});

//Remove um artista e todas as músicas dele do banco de dados
router.delete("/remover", 
    verifyJWT,
    checkRole(cargosUsuarios.ADMIN), 
    async(req, res, next) => {
    const id = req.body.id;
    try{
        await ArtistasServices.remover(id);
        res.status(200).json("Artista removido");
    }catch(erro){
        next(erro);
    }
})