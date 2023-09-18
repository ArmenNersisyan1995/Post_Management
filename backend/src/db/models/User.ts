import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from 'db/config';

interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }

export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserOutput {
  public id!: number;
  public name!: string;
  public surname!: string;
  public password!: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at'
  }
}, {
  freezeTableName: true,
  tableName: 'user',
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.password;
    },
    afterUpdate: (record) => {
      delete record.dataValues.password;
    }
  },
  timestamps: true,
  sequelize: sequelize,
  paranoid: true
});


export default User;