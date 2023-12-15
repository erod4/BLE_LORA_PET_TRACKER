const express = require("express");
const userRoute = require("./routes/userRoutes");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const port = 3000;
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/dbConnect");

//middlewares
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(globalErrorHandler);
//shortening user route
app.use("/api/v1/users", userRoute);
//server
app.listen(port, () => {
  console.log(`Server: listening on port ${port}`);
});
