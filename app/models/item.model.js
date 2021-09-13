const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    ingredients: String, 
    price: Number,
    type: String
  })
);

module.exports = Item;