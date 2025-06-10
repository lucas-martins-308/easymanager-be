const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

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

      if (!usuario.ativo) {
        return res.status(401).json({ message: 'Usuário inativo' });
      }

      const token = jwt.sign(
        { id: usuario.id, tipo: usuario.tipo },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController(); 