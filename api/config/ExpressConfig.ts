import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
};

app.use(cors(options));

app.use(cookieParser());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

import { router as musicaRouter } from '../src/domains/musicas/controllers/index';
app.use("/api/musicas", musicaRouter);

import { router as usuariosRouter } from '../src/domains/usuarios/controllers/index';
app.use("/api/usuarios", usuariosRouter);

import { router as artistasRouter } from '../src/domains/artistas/controllers/index';
app.use("/api/artistas", artistasRouter);

import { router as musicausuarioRouter} from '../src/domains/musicaUsuario/controllers/index';
app.use("/api/musicaUsuario", musicausuarioRouter);

module.exports = app;