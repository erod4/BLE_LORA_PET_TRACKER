const axios = require("axios");

const sendText = async (phone, resetCode) => {
  try {
    const message = await axios.post("https://textbelt.com/text", {
      phone,
      message: `Roam Rover: You're resetting your password\n Use requested code ${resetCode} in our app to complete your request`,
      key: process.env.TEXT_BELT_KEY,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendText;
