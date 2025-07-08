const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quarto = sequelize.define('Quarto', {
  idQuarto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idQuarto'
  },
  numeroQuarto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'numeroQuarto'
  },
  tipoQuarto: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'tipoQuarto'
  },
  precoDiaria: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'precoDiaria'
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'capacidade'
  },
  statusQuarto: {
    type: DataTypes.ENUM('disponivel', 'ocupado', 'manutencao'),
    allowNull: false,
    field: 'statusQuarto'
  },
}, {
  tableName: 'Quarto',
  timestamps: false,
});

module.exports = Quarto; 