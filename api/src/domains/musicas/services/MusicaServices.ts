import {Musica, MusicaInterface} from "../models/Musica";
import {Artista} from "../../artistas/models/Artista";
import { QueryError } from "../../../../errors/QueryError";
import { Attributes } from 'sequelize/types';

class MusicaServicesClasse{
    /** @brief Adiciona uma música ao banco de dados e relaciona ela com um artista já existente.  */
    async criar(body: Attributes<MusicaInterface>){
        const artista = await Artista.findByPk(body.artistaId);
        if(!artista){
            throw new QueryError("Artista não encontrado");
        }else
            await Musica.create(body);
    }

    /** @brief Lista todas as músicas do banco de dados.*/
    async listarTodas(){
        const musicas = await Musica.findAll();
        if(musicas.length == 0)
            throw new QueryError("Nenhuma música encontrada no banco de dados");
        else{
            return musicas;
        }
    }

    /** @brief Retorna a música que tem o mesmo ID informado. */
    async filtrarID(_id: string){
        const musicas = await Musica.findByPk(_id);
        if(!musicas)
            throw new QueryError("Música não encontrada");

        return musicas;
    }

    /** @brief Retorna o artista da música pelo ID de uma música. */
    async pegarArtista(id: Attributes<MusicaInterface>){
        const musica = await Musica.findOne({where: {id : id}});
        if(!musica)
            throw new QueryError("Música não encontrada");
        else{
            return Artista.findByPk(musica.artistaId);
        }
    }

    /** @brief Atualiza uma música já existente no banco de dados. */
    async atualizar(body: Attributes<MusicaInterface>){
        let musica = await Musica.findByPk(body.id);
        if(!musica)
            throw new QueryError("Música não encontrada");
        else{
            await Musica.update(
                {
                    foto: body.foto,
                    titulo: body.titulo
                },
                {
                    where: {id: body.id}
                }
            );
        }
    }

    /** @brief Remove uma música já existente no banco de dados. */
    async remover(id: string){
        const musica = await Musica.findByPk(id);
        if(!musica)
            throw new QueryError("Música não encontrada");
        else{
            await musica.destroy();
        }
    }
};

export const MusicaServices = new MusicaServicesClasse();