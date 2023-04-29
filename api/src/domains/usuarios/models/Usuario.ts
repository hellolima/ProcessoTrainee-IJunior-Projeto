import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { cargosUsuarios } from '../constants/cargosUsuarios';

export interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
    id: CreationOptional<string>;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export const User = sequelize.define<UserInterface>('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.ENUM,
      values: [cargosUsuarios.ADMIN, cargosUsuarios.USER],
      allowNull: false,
    },
  });