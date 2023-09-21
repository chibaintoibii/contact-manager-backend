import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "users", timestamps: false})
export class User extends Model<User> {
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  username: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;
}