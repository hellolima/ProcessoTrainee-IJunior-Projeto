const {DataTypes} = require('sequelize');
const sequelize = require('../../../../database/index');
const Musica = require("../../musicas/models/Musica");
const Usuario = require("../../usuarios/models/Usuario");
  
const musicaUsuario = sequelize.define('musicaUsuario', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
}); 

Usuario.belongsToMany(Musica, {through: musicaUsuario});
Musica.belongsToMany(Usuario, {through: musicaUsuario});

// musicaUsuario.sync({alter: false, force: false})
//     .then(() => {
//         console.log('Tabela musicaUsuario foi (re)criada');
//     })
//     .catch((err) => console.log(err));

module.exports = musicaUsuario;