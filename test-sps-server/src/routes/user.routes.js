// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middleware/auth.jwt");
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Rutas CRUD
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", authenticateJWT, getUsers);
router.get("/users/:userId", authenticateJWT, getUserById);
router.put("/users/:id", authenticateJWT, updateUser);
router.delete("/users/:id", authenticateJWT, deleteUser);

module.exports = router;
