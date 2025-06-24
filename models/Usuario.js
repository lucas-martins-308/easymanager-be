const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeCompleto: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  dtNascimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipoUsuario: {
    type: DataTypes.ENUM('adm', 'func'),
    allowNull: false
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
  tableName: 'usuario',
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