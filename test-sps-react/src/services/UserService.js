//process.env.REACT_APP_SERVER_URL}

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api`; // URL base para la API

// Función para autenticar el usuario
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();
    return data.token; // Retorna el token JWT
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para registrar un usuario
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, type: "user" }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para obtener todos los usuarios
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Aseguramos que se pase el token de autenticación
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar usuarios");
    }

    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para obtener un usuario por su ID
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Aseguramos que se pase el token de autenticación
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar el usuario");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para actualizar un usuario
export const updateUser = async (userId, name, email) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para eliminar un usuario
export const deleteUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Aseguramos que se pase el token de autenticación
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    return { message: "Usuario eliminado exitosamente" };
  } catch (error) {
    throw new Error(error.message);
  }
};
