const express = require("express");
const mongoose = require("mongoose");
// const fruits = require("./models/fruits");
const Fruit = require("./models/fruits");
const methodOverride = require("method-override");
const fruitsController = require("./controllers/fruits");
const usersController = require("./controllers/users")
const sessionController = require("./controllers/sessions")

// CONFIG - DOTENV
require("dotenv").config();
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;

// CONFIG - MONGODB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// CONFIG - EXPRESS
const app = express();
// near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// ROUTES
app.use("/fruits", fruitsController);
app.use("/users", usersController)
app.use("/sessions", sessionController);

app.listen(PORT, () => {
  console.log("Server listing at " + PORT);
});
