const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  nome_item: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  data_validade: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'produtos',
  timestamps: true,
});

module.exports = {
  sequelize,
  Produto,
};