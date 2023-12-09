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

const userRoute = express.Router();

userRoute.post("/register", registerController);

userRoute.post("/login", loginController);

userRoute.post("/reset", resetController);

userRoute.post("/verify-reset", verifyResetController);

userRoute.get("/", getUser);

userRoute.put("/", updateUser);

userRoute.delete("/", deleteUser);

module.exports = userRoute;
