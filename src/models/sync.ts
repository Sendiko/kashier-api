import Admin from "./admin.js";
import History from "./history.js";
import Item from "./item.js";
import User from "./user.js";
import bcrypt from "bcrypt";

const syncModels = async () => {
  try {
    await Admin.sync();
    const admins = await Admin.findAll();
    console.log(admins.length);
    if (admins.length === 0) {
      const password = await bcrypt.hash("admin123", 10);
      await Admin.create({ name: "admin", password: password });
      const newAdmins = await Admin.findAll();
      console.log(newAdmins);
    }
    User.hasMany(Item, { foreignKey: "userId" })
    User.hasMany(History, { foreignKey: "userId" })
    await User.sync();

    Item.belongsTo(User, { foreignKey: "userId" });
    await Item.sync();

    History.belongsTo(User, { foreignKey: "userId" });
    await History.sync();
  } catch (error: any) {
    console.error("Error syncing models: ", error.message);
  }
}

export default syncModels;