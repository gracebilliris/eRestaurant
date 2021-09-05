const db = require("../models");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");

exports.create = (req,res) => {
    if(!req.body.date) {
      res.status(500).send({ message: "Content can not be empty!" });
      return;
    }

    //Create
    const booking = new Booking({
      username: req.body.username,
      date: req.body.date,
      time: req.body.time,
      seats: req.body.seats,
    });

    booking
      .save(booking)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({ message: "Something happen i dont know u figure it out"});
      })
}