import express from "express";

const fruits = ["apple", 'Banana']

const app = express();

app.get("/fruits/", (req, res) => {
  res.send(fruits);
})

app.listen(3000);