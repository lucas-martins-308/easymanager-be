const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fornecedor = sequelize.define('Fornecedor', {
  idFornecedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idFornecedor'
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'nome'
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    field: 'telefone'
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'email'
  },
  Endereco_idEndereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Endereco_idEndereco',
    references: {
      model: 'Endereco',
      key: 'idEndereco',
    },
  },
}, {
  tableName: 'Fornecedor',
  timestamps: false,
});

module.exports = Fornecedor; 