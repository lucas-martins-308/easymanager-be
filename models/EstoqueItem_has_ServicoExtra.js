const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstoqueItem_has_ServicoExtra = sequelize.define('EstoqueItem_has_ServicoExtra', {
  EstoqueItem_idItem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'EstoqueItem_idItem',
    references: {
      model: 'EstoqueItem',
      key: 'idItem',
    },
  },
  ServicoExtra_idServicoExtra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ServicoExtra_idServicoExtra',
    references: {
      model: 'ServicoExtra',
      key: 'idServicoExtra',
    },
  },
}, {
  tableName: 'EstoqueItem_has_ServicoExtra',
  timestamps: false,
});

module.exports = EstoqueItem_has_ServicoExtra; 