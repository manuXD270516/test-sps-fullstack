// config/authConfig.js
module.exports = {
    secret: process.env.JWT_SECRET || 'your_secret_key',  // Cambiar a un valor seguro
    expiresIn: '1h'
  };
  