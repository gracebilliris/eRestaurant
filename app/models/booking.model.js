const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    booking_id: String,
    username: String,
    date: String,
    time: String,
    number_seats: String
  })
);

module.exports = Booking;