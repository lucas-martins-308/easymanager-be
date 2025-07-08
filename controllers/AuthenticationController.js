const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const env = require('../config/env');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const senhaValida = await usuario.validarSenha(senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.idUsuario, tipo: usuario.tipoUsuario },
        env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        usuario: {
          id: usuario.idUsuario,
          nome: usuario.nomeCompleto,
          email: usuario.email,
          tipo: usuario.tipoUsuario
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController(); 