const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
  idReserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dtCheckin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dtCheckout: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  valorReserva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  canalReserva: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  statusReserva: {
    type: DataTypes.ENUM('confirmada', 'cancelada', 'pendente'),
    allowNull: false,
  },
}, {
  tableName: 'Reserva',
  timestamps: false,
});

module.exports = Reserva; 