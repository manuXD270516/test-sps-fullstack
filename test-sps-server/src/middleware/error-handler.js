// src/middleware/errorHandler.js
const CustomError = require('../utils/custom-error');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // Si el error no es un CustomError, devuelves un error genérico
  res.status(500).json({ message: "Algo salió mal. Inténtalo de nuevo más tarde." });
};

module.exports = errorHandler;
