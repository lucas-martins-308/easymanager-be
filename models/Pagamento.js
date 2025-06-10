const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Reserva = require('./Reserva');

const Pagamento = sequelize.define('Pagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  dataPagamento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  metodoPagamento: {
    type: DataTypes.ENUM('cartao', 'dinheiro', 'pix', 'transferencia'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado'),
    defaultValue: 'pendente'
  },
  comprovante: {
    type: DataTypes.STRING
  },
  observacoes: {
    type: DataTypes.TEXT
  }
});

Pagamento.belongsTo(Reserva, { foreignKey: 'reservaId' });

module.exports = Pagamento; 