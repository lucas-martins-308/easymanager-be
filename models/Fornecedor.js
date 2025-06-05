const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fornecedor = sequelize.define('Fornecedor', {
  idFornecedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Endereco_idEndereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
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