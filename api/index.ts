import { app } from './config/ExpressConfig';
import { getEnv } from './utils/functions/getEnv';

const porta = getEnv('PORT');

app.listen(porta, () => {console.log(`Servidor rodando na porta ${porta}`)});