const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    username: String,
    date: String,
    time: String,
    seats: Number,
    meals: Array,
    totalcost: Number,
    active: Boolean
  })
);

module.exports = Booking;
