import { DataTypes, Model } from "sequelize";
import database from "../database/db.js";

class History extends Model {
  public id!: number
  public userId!: string
  public total!: number
  public items!: number
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    items: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: database
  }
)

export default History;