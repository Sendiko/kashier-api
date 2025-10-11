import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const database = new Sequelize(config.DBNAME, config.DBUSER, config.DBPWD, {
  dialect: 'mysql',
});

database.authenticate()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error: any) => {
    console.error(error);
  });

export default database;