const jwt = require('jsonwebtoken');
const env = require('../config/env');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('Auth middleware: Token não fornecido');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    console.log('Auth middleware: Token mal formatado - parts.length:', parts.length);
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    console.log('Auth middleware: Scheme inválido:', scheme);
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Auth middleware: Erro ao verificar token:', err.message);
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }

    req.usuarioId = decoded.id;
    req.usuarioTipo = decoded.tipo;
    return next();
  });
}; 