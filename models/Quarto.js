const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quarto = sequelize.define('Quarto', {
  idQuarto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numeroQuarto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipoQuarto: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  precoDiaria: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statusQuarto: {
    type: DataTypes.ENUM('disponivel', 'ocupado', 'manutencao'),
    allowNull: false,
  },
}, {
  tableName: 'Quarto',
  timestamps: false,
});

module.exports = Quarto; 