import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';
import { Artista } from '../../artistas/models/Artista';

export interface MusicaInterface extends Model<InferAttributes<MusicaInterface>, InferCreationAttributes<MusicaInterface>> {
  id: CreationOptional<string>;
  titulo: string;
  foto: string;
  categoria: string;
  artistaId: string
};

export const Musica = sequelize.define<MusicaInterface>('Musica', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  foto:{
    type: DataTypes.STRING,
    allowNull: false
  },
  titulo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria:{
    type: DataTypes.STRING,
    allowNull: false
  },
  artistaId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Artista.hasMany(Musica, {
  foreignKey: "artistaId",
  onDelete: "CASCADE"
});

Musica.belongsTo(Artista, {
  foreignKey: "artistaId",
  onDelete: "CASCADE"
});

// Musica.sync({alter: false, force: false})
//     .then(() => {
//         console.log('Tabela de Musicas foi (re)criada');
//     })
//     .catch((err) => console.log(err));
