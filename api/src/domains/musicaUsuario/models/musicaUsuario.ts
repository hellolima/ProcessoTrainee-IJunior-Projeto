import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';
import { Musica } from '../../musicas/models/Musica';
import { Usuario } from '../../usuarios/models/Usuario';

interface musicaUsuario extends Model<InferAttributes<musicaUsuario>, InferCreationAttributes<musicaUsuario>> {
  id: CreationOptional<string>;
}

export const musicaUsuario = sequelize.define('musicaUsuario', {
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