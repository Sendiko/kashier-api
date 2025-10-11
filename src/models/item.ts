import { DataTypes, Model } from "sequelize";
import database from "../database/db.js";

class Item extends Model {
  public id!: string
  public name!: string
  public price!: number
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
  }
}, {
  sequelize: database
});

export default Item;