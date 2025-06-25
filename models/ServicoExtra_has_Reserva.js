const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServicoExtra_has_Reserva = sequelize.define('ServicoExtra_has_Reserva', {
  ServicoExtra_idServicoExtra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'ServicoExtra',
      key: 'idServicoExtra',
    },
    field: 'idServicoExtra',
  },
  Reserva_idReserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Reserva',
      key: 'idReserva',
    },
    field: 'idReserva',
  },
}, {
  tableName: 'ServicoExtra_has_Reserva',
  timestamps: false,
});

module.exports = ServicoExtra_has_Reserva; 