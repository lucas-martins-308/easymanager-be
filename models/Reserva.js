const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hospede = require('./Hospede');

const Reserva = sequelize.define('Reserva', {
  idReserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idReserva'
  },
  dtCheckin: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'dtCheckin'
  },
  dtCheckout: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'dtCheckout'
  },
  valorReserva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'valorReserva'
  },
  canalReserva: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'canalReserva'
  },
  statusReserva: {
    type: DataTypes.ENUM('confirmada', 'cancelada', 'pendente'),
    allowNull: false,
    field: 'statusReserva'
  },
  hospedeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'hospedeId',
    references: {
      model: 'Hospede',
      key: 'idHospede'
    }
  }
}, {
  tableName: 'Reserva',
  timestamps: false
});

// Associação definida no models/index.js

module.exports = Reserva; 