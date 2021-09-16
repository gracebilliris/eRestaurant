const mongoose = require("mongoose");

const Code = mongoose.model(
  "Code",
  new mongoose.Schema({
    name: String,
    description: String
  })
);

module.exports = Code;