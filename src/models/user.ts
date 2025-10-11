import { DataTypes, Model } from "sequelize"
import database from "../database/db.js"

class User extends Model {
  public id!: string
  public name!: string
}

User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: database
});

export default User