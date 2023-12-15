const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
    },
    resetCodeExpiration: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isFirstTime: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
