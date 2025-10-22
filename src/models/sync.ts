import Admin from "./admin.js";
import History from "./history.js";
import Item from "./item.js";
import User from "./user.js";

const syncModels = async () => {
  try {
    await Admin.sync();
    const admins = await Admin.findAll();
    if (admins.length === 0) {
      await Admin.create({ name: "admin", password: "admin123" });
    }
    User.hasMany(Item, { foreignKey: "userId"})
    User.hasMany(History, { foreignKey: "userId"})
    await User.sync();

    Item.belongsTo(User, { foreignKey: "userId"});
    await Item.sync();

    History.belongsTo(User, { foreignKey: "userId"});
    await History.sync();
  } catch (error: any) {
    console.error("Error syncing models: ", error.message);
  }
}

export default syncModels;