const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connect();
