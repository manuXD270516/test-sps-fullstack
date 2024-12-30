// middleware/authenticateJWT.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

const authenticateJWT = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(403).json({ message: 'Acceso denegado' });

  // Verificar el token
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
