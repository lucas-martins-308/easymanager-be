const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstoqueItem = sequelize.define('EstoqueItem', {
  idItem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idItem'
  },
  nomeItem: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'nomeItem'
  },
  descricao: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'descricao'
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'quantidade'
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'preco'
  },
  dtValidade: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'dtValidade'
  },
  Fornecedor_idFornecedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Fornecedor_idFornecedor',
    references: {
      model: 'Fornecedor',
      key: 'idFornecedor',
    },
  },
}, {
  tableName: 'EstoqueItem',
  timestamps: false,
});

module.exports = EstoqueItem; 