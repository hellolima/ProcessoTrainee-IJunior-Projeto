const { INET } = require("sequelize");
const InvalidParamError = require("../../errors/InvalidParamError");
const Regex = require("../../constants/Regex");

const checkParams = (modelo) => { 
    return async (req, res, next) => {
        try{
            switch (modelo) {
                case "Musica":
                    if(!req.body.foto || !req.body.titulo || !req.body.categoria || !req.body.artistaId)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(req.body.foto == null || !req.body.titulo == null || !req.body.categoria == null || !req.body.artistaId == null)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(Regex.FOTO.test(req.body.foto) === false)
                        throw new InvalidParamError("Foto Inválida");
                    if(Regex.CATEGORIA.test(req.body.categoria) === false)
                        throw new InvalidParamError("Categoria Inválida");
                    break;

                case "Artista":
                    if(!req.body.nome || !req.body.nacionalidade || !req.body.foto)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(req.body.nome == null|| req.body.nacionalidade == null || req.body.foto == null)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(Regex.NACIONALIDADE.test(req.body.nacionalidade) == false)
                        throw new InvalidParamError("Nacionalidade Inválida");
                    if(Regex.FOTO.test(req.body.foto) === false)
                        throw new InvalidParamError("Foto Inválida");
                    break;

                case "Usuario":
                    if(!req.body.nome || !req.body.email || !req.body.senha || !req.body.cargo)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(req.body.nome == null|| req.body.email == null || req.body.senha == null || req.body.cargo == null)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(Regex.EMAIL.test(req.body.email) === false)
                        throw new InvalidParamError("E-mail Inválido");
                    break;

                case "musicaUsuario":
                    if(!req.body.MusicaId || !req.body.UsuarioId)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    if(req.body.MusicaId == null|| req.body.UsuarioId == null)
                        throw new InvalidParamError("Parâmetros Inválidos");
                    break;
                        
                default:
                    break;
            }
            next()
        }catch(erro){
            next(erro);
        }
    }
}

module.exports = checkParams;