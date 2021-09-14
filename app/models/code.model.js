const mongoose = require("mongoose");

const Code = mongoose.model(
  "Code",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Code;