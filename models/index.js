const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Endereco = require('./Endereco');
const Usuario = require('./Usuario');
const Fornecedor = require('./Fornecedor');
const Hospede = require('./Hospede');
const EstoqueItem = require('./EstoqueItem');
const Reserva = require('./Reserva');
const ServicoExtra = require('./ServicoExtra');
const Pagamento = require('./Pagamento');
const Quarto = require('./Quarto');
const ServicoExtra_has_Reserva = require('./ServicoExtra_has_Reserva');
const Hospede_has_Reserva = require('./Hospede_has_Reserva');
const EstoqueItem_has_ServicoExtra = require('./EstoqueItem_has_ServicoExtra');
const Quarto_has_Reserva = require('./Quarto_has_Reserva');

const Produto = sequelize.define('Produto', {
  nome_item: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  data_validade: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'produtos',
  timestamps: true,
});

// Definindo associações
Fornecedor.belongsTo(Endereco, { 
  foreignKey: 'Endereco_idEndereco', 
  targetKey: 'idEndereco',
  as: 'endereco'
});

Endereco.hasMany(Fornecedor, { 
  foreignKey: 'Endereco_idEndereco', 
  sourceKey: 'idEndereco',
  as: 'fornecedores'
});

EstoqueItem.belongsTo(Fornecedor, {
  foreignKey: 'Fornecedor_idFornecedor',
  targetKey: 'idFornecedor',
  as: 'fornecedor'
});

Fornecedor.hasMany(EstoqueItem, {
  foreignKey: 'Fornecedor_idFornecedor',
  sourceKey: 'idFornecedor',
  as: 'estoqueItems'
});

Hospede.belongsTo(Endereco, {
  foreignKey: 'Endereco_idEndereco',
  targetKey: 'idEndereco',
  as: 'endereco'
});

Endereco.hasMany(Hospede, {
  foreignKey: 'Endereco_idEndereco',
  sourceKey: 'idEndereco',
  as: 'hospedes'
});

module.exports = {
  sequelize,
  Produto,
  Endereco,
  Usuario,
  Fornecedor,
  Hospede,
  EstoqueItem,
  Reserva,
  ServicoExtra,
  Pagamento,
  Quarto,
  ServicoExtra_has_Reserva,
  Hospede_has_Reserva,
  EstoqueItem_has_ServicoExtra,
  Quarto_has_Reserva,
};