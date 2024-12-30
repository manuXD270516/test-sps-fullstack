const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { secret, expiresIn } = require("../config/auth.config");
const CustomError = require("../utils/custom-error"); // Importa la clase CustomError

// Parámetros de scrypt: Ajusta estos valores según tus necesidades de seguridad
const SCRYPT_PARAMS = {
  N: 16384, // CPU/memoria cost (potencia de 2)
  r: 8, // Tamaño del bloque
  p: 1, // Factor de paralelización
  maxmem: 32 * 1024 * 1024, // Opcional: Limitar a 32MB de RAM
};
const KEY_LENGTH = 64;

// Función para hashear la contraseña con scrypt
async function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password,
      salt,
      KEY_LENGTH,
      SCRYPT_PARAMS,
      (err, derivedKey) => {
        if (err)
          reject(
            new CustomError("Error en el proceso de hash de la contraseña", 500)
          );
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

// Registrar un usuario
const registerUser = async (name, email, type, password) => {
  try {
    const salt = crypto.randomBytes(16).toString("hex"); // Generar sal aleatoria
    const hashedPassword = await hashPassword(password, salt);
    const user = await User.create({
      name,
      email,
      type,
      password: `${salt}:${hashedPassword}`, // Guardar sal y hash juntos
    });
    return user;
  } catch (error) {
    throw new CustomError("Error registrando el usuario", 500); // Mejorar el manejo de errores
  }
};

// Login de usuario
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404); // Error 404 para usuario no encontrado
    }

    const [salt, storedHash] = user.password.split(":");
    const hashedPassword = await hashPassword(password, salt);

    if (hashedPassword === storedHash) {
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn });
      return token;
    } else {
      throw new CustomError("Contraseña incorrecta", 401); // Error 401 para contraseña incorrecta
    }
  } catch (error) {
    throw error; // Propagar el error hacia el controlador
  }
};

// Obtener todos los usuarios
const getUsers = async () => {
  try {
    const users = await User.findAll();
    if (!users) {
      throw new CustomError("No se encontraron usuarios", 404); // Error 404 si no hay usuarios
    }
    return users;
  } catch (error) {
    throw new CustomError("Error obteniendo usuarios", 500); // Error general 500
  }
};

// Función para obtener un usuario por ID
const getUserById = async (userId) => {
  try {
    // Buscamos el usuario en la base de datos por su ID
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user; // Si el usuario existe, lo retornamos
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};

// Actualizar un usuario
const updateUser = async (id, name, email, type, password) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404); // Error 404 si no se encuentra el usuario
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.type = type || user.type;
    if (password) {
      const salt = crypto.randomBytes(16).toString("hex"); // Generar nueva sal
      user.password = `${salt}:${await hashPassword(password, salt)}`;
    }

    await user.save();
    return user;
  } catch (error) {
    throw new CustomError("Error actualizando el usuario", 500); // Error general 500
  }
};

// Eliminar un usuario
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404); // Error 404 si no se encuentra el usuario
    }

    await user.destroy();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    throw new CustomError("Error eliminando el usuario", 500); // Error general 500
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
