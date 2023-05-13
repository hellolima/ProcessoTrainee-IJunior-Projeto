import { INET, Model} from "sequelize";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { Regex } from "../../constants/Regex";
import { NextFunction } from "express";

export const checkParams = (modelo: typeof Model) => { 
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            switch (modelo.name) {
                case "Musica":
                    const body_musica = ["foto", "titulo", "categoria", "artistaId"];
                    Checar_Vazio(req.body, body_musica);
                    Checar_Nulos(req.body, body_musica);

                    if(Regex.FOTO.test(req.body.foto) === false)
                        throw new InvalidParamError("Foto Inválida");
                    if(Regex.CATEGORIA.test(req.body.categoria) === false)
                        throw new InvalidParamError("Categoria Inválida");
                    break;

                case "Artista":
                    const body_artista = ["nome", "nacionalidade", "foto"];
                    Checar_Vazio(req.body, body_artista);
                    Checar_Nulos(req.body, body_artista);

                    if(Regex.NACIONALIDADE.test(req.body.nacionalidade) == false)
                        throw new InvalidParamError("Nacionalidade Inválida");
                    if(Regex.FOTO.test(req.body.foto) === false)
                        throw new InvalidParamError("Foto Inválida");
                    break;

                case "Usuario":
                    const body_usuario = ["nome", "email", "senha", "cargo"];
                    Checar_Vazio(req.body, body_usuario);
                    Checar_Nulos(req.body, body_usuario);

                    if(Regex.EMAIL.test(req.body.email) === false)
                        throw new InvalidParamError("E-mail Inválido");
                    break;

                case "musicaUsuario":
                    const body_musicausuario = ["MusicaId", "UsuarioId"];
                    Checar_Vazio(req.body, body_musicausuario);
                    Checar_Nulos(req.body, body_musicausuario);
                    break;
                        
                default:
                    break;
            }
            next()
        }catch(erro){
            next(erro);
        }
    }
};

function Checar_Nulos(body: any, parametros: string[]){
    for(const param of parametros){
        if(body[param] === null){
            throw new InvalidParamError("Parâmetros Inválidos");
        }
    }
}

function Checar_Vazio(body: any, parametros: string[]){
    for(const param of parametros){
        if(!body[param]){
            throw new InvalidParamError("Parâmetros Inválidos");
        }
    }
}