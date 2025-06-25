const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospede = sequelize.define('Hospede', {
  idHospede: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idHospede'
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'nome'
  },
  sobrenome: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'sobrenome'
  },
  documento: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'documento'
  },
  tipoDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'tipoDocumento'
  },
  dtNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'dtNascimento'
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    field: 'telefone'
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: true,
    field: 'email'
  },
  genero: {
    type: DataTypes.STRING(1),
    allowNull: false,
    field: 'genero'
  },
  preferencia: {
    type: DataTypes.STRING(45),
    allowNull: true,
    field: 'preferencia'
  },
  Endereco_idEndereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Endereco_idEndereco',
    references: {
      model: 'Endereco',
      key: 'idEndereco'
    }
  }
}, {
  tableName: 'Hospede',
  timestamps: false
});

module.exports = Hospede; 