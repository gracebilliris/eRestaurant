const mongoose = require("mongoose");

const availableBooking = mongoose.model(
  "Available",
  new mongoose.Schema({
    date: String,
    time: String,
    number_seats: String
  })
);

module.exports = availableBooking;