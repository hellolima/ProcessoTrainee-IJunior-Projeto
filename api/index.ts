import { app } from './config/ExpressConfig';
import dotenv  from 'dotenv';

const porta = process.env.PORT;

app.listen(porta, () => {console.log(`Servidor rodando na porta ${porta}`)});