const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idUsuario'
  },
  nomeCompleto: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'nomeCompleto'
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    field: 'cpf'
  },
  dtNascimento: {
    type: DataTypes.DATE,
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
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    field: 'email'
  },
  senha: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: 'senha'
  },
  tipoUsuario: {
    type: DataTypes.ENUM('adm', 'func'),
    allowNull: false,
    field: 'tipoUsuario'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'ativo'
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
  tableName: 'Usuario',
  timestamps: false,
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('senha')) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    }
  }
});

Usuario.prototype.validarSenha = async function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = Usuario; 