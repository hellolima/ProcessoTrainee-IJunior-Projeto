import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';

export interface ArtistaInterface extends Model<InferAttributes<ArtistaInterface>, InferCreationAttributes<ArtistaInterface>>{
    id: CreationOptional<string>;
    nome: string;
    nacionalidade: string;
    foto: string; 
}

export const Artista = sequelize.define<ArtistaInterface>("Artista", {
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
    nacionalidade:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Artista.sync({alter: false, force: false})
//     .then(() => {
//         console.log("Tabela de Artistas foi (re)criada");
//     })
//     .catch((erro) => console.log(erro));