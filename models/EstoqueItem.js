const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstoqueItem = sequelize.define('EstoqueItem', {
  idItem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeItem: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(45),
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
  dtValidade: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Fornecedor_idFornecedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fornecedor',
      key: 'idFornecedor',
    },
  },
}, {
  tableName: 'estoqueitem',
  timestamps: false,
});

module.exports = EstoqueItem; 