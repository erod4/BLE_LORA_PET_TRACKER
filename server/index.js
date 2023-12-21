const express = require("express");
const userRoute = require("./routes/userRoutes");
const port = 3000;
const app = express();
const cors = require("cors");
const globalErrorHandler = require("./middleware/globalErrorHandler");
require("dotenv").config();
require("./config/dbConnect");

//middlewares
app.use(express.json());

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

//shortening user route
app.use("/api/v1/users", userRoute);

app.use(globalErrorHandler);

//server
app.listen(port, () => {
  console.log(`Server: listening on port ${port}`);
});
