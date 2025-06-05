const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeCompleto: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  dtNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  tipoUsuario: {
    type: DataTypes.ENUM('adm', 'func'),
    allowNull: false,
  },
  Endereco_idEndereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Endereco',
      key: 'idEndereco',
    },
  },
}, {
  tableName: 'Usuario',
  timestamps: false,
});

Usuario.beforeCreate(async (usuario, options) => {
  if (usuario.senha) {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  }
});

Usuario.beforeUpdate(async (usuario, options) => {
  if (usuario.changed('senha')) {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  }
});

module.exports = Usuario; 