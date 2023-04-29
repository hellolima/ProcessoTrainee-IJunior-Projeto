const Artista = require("../models/Artista");
const Musica = require("../../Musicas/models/Musica");
const QueryError = require("../../../../errors/QueryError");

class ArtistaService{
    /** @brief Cria um artista. */
    async criar(body){
        const artista = await Artista.findOne({where: {nome: body.nome}});
        if(artista)
            throw new QueryError("Nome já utilizado");

        await Artista.create(body);
    }

    /** @brief Lista todas as músicas de um artista pelo id do artista. */
    async listarArtista(_id){
        const artista = await Artista.findByPk(_id);
        if(!artista)
            throw new QueryError("Artista não encontrado");

        const musicas = Musica.findAll({where: {artistaId: _id}});
        return musicas;
    }

    /** @brief Atualiza um artista já existente no banco de dados.*/
    async atualizar(body){
        let artista = await Artista.findByPk(body.id); 
        if(!artista)
            throw new QueryError("Artista não encontrado");

        artista = await Artista.update(
            {
                nome: body.nome,
                nacionalidade: body.nacionalidade,
                foto: body.foto
            },
            {
                where: {id: body.id}
            }
        );
    }

    /**@brief Remove um artista já existente do banco de dados. */
    async remover(id){
        const artista = await Artista.findByPk(id);
        if(!artista)
            throw new QueryError("Artista não existente");
        
        await artista.destroy();
    }
};

module.exports = new ArtistaService();