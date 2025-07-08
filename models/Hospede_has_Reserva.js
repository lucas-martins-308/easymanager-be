const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospede_has_Reserva = sequelize.define('Hospede_has_Reserva', {
  Hospede_idHospede: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'Hospede_idHospede',
    references: {
      model: 'Hospede',
      key: 'idHospede',
    },
  },
  Reserva_idReserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'Reserva_idReserva',
    references: {
      model: 'Reserva',
      key: 'idReserva',
    },
  },
}, {
  tableName: 'Hospede_has_Reserva',
  timestamps: false,
});

module.exports = Hospede_has_Reserva; 