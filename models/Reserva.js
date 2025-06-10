const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hospede = require('./Hospede');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dataCheckin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dataCheckout: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'confirmada', 'checkin', 'checkout', 'cancelada'),
    defaultValue: 'pendente'
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  observacoes: {
    type: DataTypes.TEXT
  },
  numeroQuarto: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Reserva.belongsTo(Hospede, { foreignKey: 'hospedeId' });

module.exports = Reserva; 