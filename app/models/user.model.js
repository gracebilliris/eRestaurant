const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking_id"
      }
    ]
  })
);

module.exports = User;