// controllers/userController.js
const userService = require("../services/user.service");

// Registrar un usuario
exports.registerUser = async (req, res) => {
  const { name, email, type, password } = req.body;

  try {
    const user = await userService.registerUser(name, email, type, password);
    res.status(201).json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Endpoint para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params; 

  try {
    const user = await userService.getUserById(userId); 
    res.json(user); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, type, password } = req.body;

  try {
    const updatedUser = await userService.updateUser(
      id,
      name,
      email,
      type,
      password
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
