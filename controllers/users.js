const express = require("express");
const User = require("../models/users")
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("users")
})

//* "/users/new" => form with password & username
router.get("/new", (req, res) => {
  res.render("users/new")
})

//* /users (POST) => create a new user
router.post("/", (req, res) => {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
  
    User.create(req.body, (error, user) => {
      console.log("user", user);
      res.redirect("/fruits/");
    })
  })

module.exports = router;
