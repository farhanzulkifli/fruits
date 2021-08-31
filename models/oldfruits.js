const fruits = [
    {
      name: "apple",
      color: "red",
      readyToEat: true,
    },
    {
      name: "pear",
      color: "green",
      readyToEat: false,
    },
    {
      name: "banana",
      color: "yellow",
      readyToEat: true,
    },
  ];
  
  module.exports = fruits;
  //* export default fruits => es6 modules
  //* export const PI = 3.142 => import { PI } from XXX
  //* module.exports = { PI: 3.142 } => const { PI } = require("XXX")