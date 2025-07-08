const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASS,
  {
    host: env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
      underscored: false
    }
  }
);

module.exports = sequelize;
