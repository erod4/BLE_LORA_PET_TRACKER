const express = require("express");
const userRoute = require("./routes/userRoutes");
const port = 3000;
const app = express();

//shortening user route
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
  console.log(`Server: listening on port ${port}`);
});
