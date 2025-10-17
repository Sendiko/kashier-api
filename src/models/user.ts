import { DataTypes, Model } from "sequelize"
import database from "../database/db.js"

class User extends Model {
  public id!: string
  public name!: string
  public token?: string | null
}

User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize: database,
  tableName: "users",
  modelName: "User"
});

export default User