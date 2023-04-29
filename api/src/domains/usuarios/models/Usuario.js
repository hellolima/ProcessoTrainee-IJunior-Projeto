const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const cargoUsuarios = require("../../../../constants/cargoUsuario");

const Usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo:{
        type: DataTypes.ENUM({
            values: [cargoUsuarios.ADMIN, cargoUsuarios.USER]
        }),
    },
}); 

// Usuario.sync({alter: false, force: false})
//     .then(() => {
//         console.log('Tabela de Usuarios foi (re)criada');
//     })
//     .catch((err) => console.log(err));

module.exports = Usuario;