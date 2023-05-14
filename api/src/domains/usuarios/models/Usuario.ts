import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';
import { cargoUsuario } from "../../../../constants/cargoUsuario";

export interface UsuarioInterface extends Model<InferAttributes<UsuarioInterface>, InferCreationAttributes<UsuarioInterface>> {
    id: CreationOptional<string>;
    nome: string;
    email: string;
    senha: string;
    cargo: string;
  }

export const Usuario = sequelize.define<UsuarioInterface>('Usuario', {
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
            values: [cargoUsuario.ADMIN, cargoUsuario.USER]
        }),
    },
}); 

// Usuario.sync({alter: false, force: false})
//     .then(() => {
//         console.log('Tabela de Usuarios foi (re)criada');
//     })
//     .catch((err) => console.log(err));