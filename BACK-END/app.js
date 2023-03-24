const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
 
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/places/", placesRoutes);
app.use("/api/users/", usersRoutes);
app.use(() => {
  throw new HttpError("colud not found your Request", 404);
});

// handle Errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknow error has occured!" });
});
mongoose
  .connect("mongodb://127.0.0.1:1010/Place")
  .then(() => {
    app.listen(5000);
  })
  .catch(() => console.log("cant connect to database !"));
