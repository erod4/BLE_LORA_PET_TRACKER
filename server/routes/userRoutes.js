const express = require("express");
const {
  registerController,
  loginController,
  resetController,
  verifyResetController,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const isLoggedIn = require("../middleware/isLoggedIn");

const userRoute = express.Router();

userRoute.post("/register", registerController);

userRoute.post("/login", loginController);

userRoute.post("/reset", resetController);

userRoute.post("/verify-reset", verifyResetController);

userRoute.get("/profile", isLoggedIn, getUser);

userRoute.put("/", isLoggedIn, updateUser);

userRoute.delete("/", isLoggedIn, deleteUser);

module.exports = userRoute;
