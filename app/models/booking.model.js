const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    username: String,
    date: String,
    time: String,
    seats: String
  })
);

module.exports = Booking;