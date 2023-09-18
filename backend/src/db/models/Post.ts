import  { DataTypes, Model, Optional } from 'sequelize';
import sequelize from  'db/config';
import User from './User';

interface PostAttributes {
  id: number;
  title: string;
  description: string;
  userId?: number;
}

export interface PostInput extends Optional<PostAttributes, 'id'> {}

export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostOutput {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID
  }
}, {
  tableName: 'post',
  timestamps: true,
  sequelize: sequelize,
  paranoid: true
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  foreignKeyConstraint: true
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  foreignKeyConstraint: true
});

export default Post;