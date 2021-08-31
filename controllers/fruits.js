const express = require("express");
const Fruit = require("../models/fruits")
const router = express.Router();

router.get("/seed", (req, res) => {
  Fruit.remove({}, (error, fruits) => {
    Fruit.create(
      [
        {
          name: "grapefruit",
          color: "pink",
          readyToEat: true,
        },
        {
          name: "grape",
          color: "purple",
          readyToEat: false,
        },
        {
          name: "avocado",
          color: "green",
          readyToEat: true,
        },
      ],
      (err, data) => {
        res.redirect("/fruits");
      }
    );
  });
});

//* index => shows all the fruits
router.get("/", (req, res) => {
  Fruit.find({}, (error, fruits) => {
    res.render("index", { fruits });
  });
});
//* new route => shows form to create a new fruit
router.get("/new", (req, res) => {
  res.render("new");
});

//* post => create a new fruit
router.post("/", (req, res) => {
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  // req.body = { name: "durian", color: "green" ...}

  Fruit.create(req.body, (error, createdFruit) => {
    console.log("createdFruit", createdFruit);
    res.redirect("/fruits/");
  });
  // fruits.push(req.body);
  // res.render("index", {fruits});
});

//* show route => show 1 fruit
//* route uses :id => extract using req.params
router.get("/:id", (req, res) => {
  const pos = req.params.id;
  Fruit.findById(pos, (err, fruit) => {
    res.render("show", { fruit, pos });
  });
});

//* delete route => delete 1 fruit
router.delete("/:id", (req, res) => {
  Fruit.findByIdAndRemove(req.params.id, (err, fruit) => {
    res.redirect("/fruits"); //redirect back to index route
  });
  // fruits.splice(req.params.index, 1); //remove the item from the array
});

//* edit route => actually update the fruit
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const fruit = { ...req.body, readyToEat: req.body.readyToEat === "on" };
  Fruit.findByIdAndUpdate(id, fruit, { new: true }, (err, fruit) => {
    res.redirect("/");
  });
});

// * show edit form route => show edit form
router.get("/:id/edit", (req, res) => {
  const pos = req.params.id;
  Fruit.findById(pos, (error, fruit) => {
    res.render("edit", { fruit, pos });
  });
});


module.exports = router;