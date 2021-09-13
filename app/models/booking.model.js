const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    username: String,
    date: String,
    time: String,
    seats: Number,
    active: Boolean,
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      }
    ],
    totalPrice: Number
  })
);

module.exports = Booking;