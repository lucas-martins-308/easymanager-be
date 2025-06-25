const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Endereco = sequelize.define('Endereco', {
  idEndereco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idEndereco'
  },
  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  logradouro: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  complemento: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'endereco',
  timestamps: false,
});

module.exports = Endereco; 