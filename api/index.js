const app = require("./config/ExpressConfig");
require('dotenv').config();

const porta = process.env.PORT;
app.listen(porta, console.log(`Servidor rodando na porta ${porta}`));