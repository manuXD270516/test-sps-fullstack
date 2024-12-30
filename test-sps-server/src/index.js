// server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/error-handler');

// Otras configuraciones y rutas



const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());  // Habilitar CORS para el frontend
app.use(errorHandler); // Manejo global de errores

// Rutas
app.use('/api', userRoutes);

// Iniciar servidor
app.listen(port, async () => {
  try {
    //await sequelize.sync({ force: true }); // Sincroniza la base de datos
    console.log(`Servidor corriendo en el puerto ${port}`);
  } catch (err) {
    console.error('Error de servidor: ', err);
  }
});
