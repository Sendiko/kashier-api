import { DataTypes, Model } from "sequelize"
import database from "../database/db.js"

class Admin extends Model {
  public id!: string
  public name!: string
  public password!: string  
  public token?: string | null
}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: database,
  tableName: "admins",
  modelName: "Admin"
});

export default Admin;