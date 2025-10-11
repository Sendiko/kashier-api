import History from "./history.js";
import Item from "./item.js";
import User from "./user.js";

const syncModels = async () => {
  try {
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