const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quarto_has_Reserva = sequelize.define('Quarto_has_Reserva', {
  Quarto_idQuarto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Quarto',
      key: 'idQuarto',
    },
  },
  Reserva_idReserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Reserva',
      key: 'idReserva',
    },
  },
}, {
  tableName: 'Quarto_has_Reserva',
  timestamps: false,
});

module.exports = Quarto_has_Reserva; 