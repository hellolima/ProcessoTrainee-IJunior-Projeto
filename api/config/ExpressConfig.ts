import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import { getEnv } from '../utils/functions/get-env';

dotenv.config();
export const app: Express = express();

const options: CorsOptions = {
    origin: getEnv('APP_URL'),
    credentials: true
  };
  app.use(cors(options));
  
  app.use(cookieParser());
  
  app.use(express.urlencoded({
    extended: true,
  }));
  
  app.use(express.json());

  import { router as usuariosRouter } from '../src/domains/users/controllers/index';
  app.use('/api/usuarios', usuarios);
  
  import { router as artistasRouter } from '../src/domains/artistas/controllers/index';
  app.use('/api/artistas', artistasRouter);
  
  import { router as musicasRouter } from '../src/domains/musicas/controllers/index';
  app.use('/api/musicas', musicasRouter);
  
  import { router as musicaUsuarioRouter } from '../src/domains/userSongs/controllers/index';
  app.use('/api/musicaUsuario', musicaUsuarioRouter);
  
  import { errorHandler } from '../src/middlewares/error-handler';
  app.use(errorHandler);
  
