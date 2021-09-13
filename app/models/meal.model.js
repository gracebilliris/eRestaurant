const mongoose = require("mongoose");

const Meal = mongoose.model(
  "Meal",
  new mongoose.Schema({
    name: String,
    price: Number,
    ingredients: String,
    menu: String
  })
);

module.exports = Meal;