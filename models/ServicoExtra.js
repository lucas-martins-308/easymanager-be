const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServicoExtra = sequelize.define('ServicoExtra', {
  idServicoExtra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idServicoExtra'
  },
  descricao: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'descricao'
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'valor'
  },
}, {
  tableName: 'ServicoExtra',
  timestamps: false,
});

module.exports = ServicoExtra; 