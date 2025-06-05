const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
  idPagamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valorPago: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dtPagamento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  metodoPagamento: {
    type: DataTypes.ENUM('credito', 'debito', 'dinheiro', 'pix'),
    allowNull: false,
  },
  Reserva_idReserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Reserva',
      key: 'idReserva',
    },
  },
}, {
  tableName: 'Pagamento',
  timestamps: false,
});

module.exports = Pagamento; 