const musicaUsuario = require('../models/musicaUsuario');
const Musica = require('../../musicas/models/Musica');
const Usuario = require("../../usuarios/models/Usuario");
const QueryError = require("../../../../errors/QueryError");

class musicaUsuarioService{
    /** @brief Relaciona uma música existente a um usuário existente no banco de dados. */
    async criar(body){
        const musica = await Musica.findByPk(body.MusicaId);
        const usuario = await Usuario.findByPk(body.UsuarioId);
        if(!musica || !usuario)
            throw new QueryError("Música ou Usuário não existem");

        await musicaUsuario.create(body);
    }
    /** @brief Lista todas as músicas que um determinado ussuário escuta.*/
    async listarUsuario(_UsuarioId){
        const usuario = await musicaUsuario.findAll({where: {UsuarioId: _UsuarioId}});
        var musicas = new Array(usuario.length);
        if(musicas.length === 0)
            throw new QueryError("Artista não existe");

        for(let i = 0; i < usuario.length; i++)
            musicas[i] = await Musica.findByPk(usuario[i].MusicaId);
        return musicas;
    }
};

module.exports = new musicaUsuarioService();