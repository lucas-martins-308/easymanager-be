const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospede = sequelize.define('Hospede', {
  idHospede: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  documento: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  tipoDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dtNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  genero: {
    type: DataTypes.STRING(1),
    allowNull: false
  },
  preferencia: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  Endereco_idEndereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'endereco',
      key: 'idEndereco'
    }
  }
}, {
  tableName: 'hospede',
  timestamps: false
});

module.exports = Hospede; 