require('dotenv').config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

const musicaRouter = require("../src/domains/Musicas/controllers/index");
app.use("/api/musicas", musicaRouter);

const usuariosRouter = require("../src/domains/Usuarios/controllers/index");
app.use("/api/usuarios", usuariosRouter);

const artistasRouter = require("../src/domains/Artistas/controllers/index");
app.use("/api/artistas", artistasRouter);

const musicausuarioRouter = require("../src/domains/musicaUsuario/controllers/index");
app.use("/api/musicaUsuario", musicausuarioRouter);

module.exports = app;