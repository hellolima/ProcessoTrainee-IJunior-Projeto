import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';
import { Musica } from '../../musicas/models/Musica';
import { Usuario } from '../../usuarios/models/Usuario';

export interface musicaUsuarioInterface extends Model<InferAttributes<musicaUsuarioInterface>, InferCreationAttributes<musicaUsuarioInterface>> {
  id: CreationOptional<string>;
  UsuarioId: string;
  MusicaId: string;
}

export const musicaUsuario = sequelize.define<musicaUsuarioInterface>('musicaUsuario', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UsuarioId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MusicaId:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
}); 

Usuario.belongsToMany(Musica, {
  through: musicaUsuario,
  foreignKey: "UsuarioId",  
});
Musica.belongsToMany(Usuario, {
  through: musicaUsuario,
  foreignKey: "MusicaId",
});

// musicaUsuario.sync({alter: false, force: false})
//     .then(() => {
//         console.log('Tabela musicaUsuario foi (re)criada');
//     })
//     .catch((err) => console.log(err));