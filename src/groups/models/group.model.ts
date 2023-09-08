import { Column, Table, Model, DataType, HasMany } from "sequelize-typescript";
import { Contact } from "../../contacts/models/contact.model";

@Table({ timestamps: false, tableName: 'groups' })
export class Group extends Model<Group>{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name: string;

  @HasMany(() => Contact)
  contacts: Contact[];
}