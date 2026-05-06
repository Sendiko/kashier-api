import { DataTypes, Model } from "sequelize";
import database from "../database/db.js";

class Item extends Model {
  public id!: string
  public name!: string
  public price!: number
  public userId!: string
}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize: database,
  tableName: "items",
  modelName: "Item"
});

export default Item;