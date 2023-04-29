import { Router, Request, Response, NextFunction } from 'express';
import { MusicasServices } from'../services/MusicasServices';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { cargosUsuarios } from '../../usuarios/constants/cargosUsuarios';

export const router = Router();

//Adiciona uma música ao banco de dados
router.post('/criar',
    verifyJWT,
    checkRole(cargosUsuarios.ADMIN),
    checkParams("Musica"),
    async(req, res, next) =>{
    try{
        await MusicasServices.criar(req.body);
        res.status(201).json('Música criada com sucesso!');
    }catch(erro){
        next(erro);
    }
});

//Lista todas as músicas no banco de dados
router.get("/listarTodas",
    verifyJWT,
    async(req, res, next) => {
    try {
        const musicas = await MusicasServices.listarTodas();
        res.status(200).json(musicas);
    } catch(erro) {
        next(erro);
    }
});

//Filtra o banco de dados pelo id passado
router.get("/listarID",
    verifyJWT,
    async(req, res, next) => {
    const id = req.body.id;
    try{
        const musicas = await MusicasServices.filtrarID(id);
        res.status(200).json(musicas);
    } catch(error) {
        return next(error);
    }
});

//Pega um artista pelo id da musica
router.get("/pegarArtista",
    verifyJWT,
    async(req, res, next) => {
    const id = req.body.id;
    try {
        const artista = await MusicasServices.pegarArtista(id);
        res.status(200).json(artista);
    }catch(erro){
        next(erro);
    }
});

//Atualiza as informações de uma música no banco de dados
router.put("/atualizar",
    verifyJWT,
    checkRole(cargosUsuarios.ADMIN),
    checkParams("Musica"), 
    async(req, res, next) => {
    const body = req.body;
    try {
        await MusicasServices.atualizar(body);
        res.status(200).json("Música atualizada");
    } catch(erro) {
        next(erro);
    }
});

//Remove uma música do banco de dados pelo id
router.delete("/remover",
    verifyJWT,
    checkRole(cargosUsuarios.ADMIN), 
    async(req, res, next) => {
    const id = req.body.id;
    try{
        await MusicasServices.remover(id);
        res.status(200).json("Música removida");
    }catch(erro){
        next(erro);
    }
});