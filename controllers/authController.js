const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
    const token = jwt.sign({ id: usuario.idUsuario, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.nomeCompleto,
        email: usuario.email,
        role: usuario.tipoUsuario,
        cpf: usuario.cpf,
        dtNascimento: usuario.dtNascimento,
        telefone: usuario.telefone,
        Endereco_idEndereco: usuario.Endereco_idEndereco
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
}; 