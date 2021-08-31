const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/users");

//* /sessions/new => form to login in
router.get("/new", (req, res) => {
  res.render("sessions/login");
});

//* /sessions (POST) => login
router.post("/", (req, res) => {
  User.findOne({
      username: req.body.username,
    },
    (err, foundUser) => {
      if (err) {
      console.log(err);
      res.send("oops the db had a problem");
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>');
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser;
        // redirect back to our home page
        res.redirect("/fruits/");
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>');
      }
    }
  });
  // res.send(req.body);
});

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

module.exports = router;
