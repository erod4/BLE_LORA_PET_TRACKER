const User = require("../models/userModel");
const AppErr = require("../utils/appError");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const generateResetCode = require("../utils/GenerateResetCode");
const sendText = require("../utils/ResetText");
const registerController = async (req, res, next) => {
  const { name, password, phone } = req.body;

  try {
    //check if user already exists if not then go ahead and sign up user otherwise return error
    const userFound = await User.findOne({ phone });

    if (userFound) {
      //throw error here
      return next(new AppErr("User Already Exists", 400));
    }
    // hash password

    const salt = bcrypt.genSalt(10);
    const hasedPassword = bcrypt.hash(password, salt);

    //create user

    const user = await User.create({ name, phone, password: hasedPassword });

    //return user

    res.json({
      status: "Success",
      firstName: user.name.split(" ")[0] ? user.name.split(" ")[0] : user.name,
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    //return error
    return next(new AppErr(error.message, 500));
  }
};

const loginController = async (req, res, next) => {
  const { phone, password } = req.body;
  try {
    const userFound = await User.findOne({ phone });

    if (!userFound) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      return next(new AppErr("Invalid Login Credentails", 400));
    }

    res.json({
      status: "Success",
      firstName: userFound.name.split(" ")[0]
        ? userFound.name.split(" ")[0]
        : userFound.name,
      id: userFound.id,
      token: generateToken(userFound.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
const resetController = async (req, res, next) => {
  const { phone } = req.body;
  try {
    const userFound = await User.findOne({ phone });
    if (!userFound) {
      return next(new AppErr("User Doesn't Exist.", 400));
    }
    const resetCode = generateResetCode();
    await User.findByIdAndUpdate(
      userFound.id,
      { resetCode, resetCodeExpiration: Date.now() + 300000 },
      { new: true, runValidators: true }
    );
    await sendText(userFound.phone, resetCode);
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
const verifyResetController = async (req, res, next) => {
  const { resetCode } = req.body;
  try {
    const userFound = User.findOne({ resetCode });
    if (!userFound) {
      return next(new AppErr("Incorrect Reset Code", 400));
    }
    await User.findByIdAndUpdate(
      userFound.id,
      { resetCode: "" },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "Success",
      firstName: userFound.name.split(" ")[0]
        ? userFound.name.split(" ")[0]
        : userFound.name,
      id: userFound.id,
      token: generateToken(userFound.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getUser = async (req, res, next) => {
  try {
  } catch (error) {}
};

const updateUser = async (req, res, next) => {
  const { id } = req.params; // assuming the user's ID is passed in the URL
  const updateFields = req.body;

  try {
    // Validate updateFields if necessary

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Ensure updated fields are validated
    });

    if (!updatedUser) {
      return next(new AppErr("User not found.", 404));
    }

    res.json({
      status: "Success",
      firstName: updatedUser.name.split(" ")[0]
        ? updatedUser.name.split(" ")[0]
        : updatedUser.name,
      id: updatedUser.id,
      token: generateToken(updatedUser.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;

  try {
    const isDeleted = await User.findByIdAndDelete({ id });

    if (isDeleted) {
      res.json({ status: "Success" });
    } else {
      return next(new AppErr("An error occured, please try again later.", 400));
    }
  } catch (error) {}
};
module.exports = {
  registerController,
  loginController,
  resetController,
  verifyResetController,
  getUser,
  updateUser,
  deleteUser,
};
