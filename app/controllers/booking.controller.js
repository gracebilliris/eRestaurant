const db = require("../models");
const Booking = db.booking;

//Create and Save Booking
exports.create = (req,res) => {
  //Validate request
  if(!req.body.date || !req.body.time || !req.body.seats) {
    res.status(500).send({message: "Content can not be empty"});
    return;
  }

  //Create Booking
  const booking = new Booking({
    username: req.body.username,
    date: req.body.date,
    time: req.body.time,
    seats: req.body.seats
  });

  //Save in Database
  booking
    .save(booking)
    .then(data => {
      res.status(500).send({message: "Booking Made"});
    })
    .catch(err => {
      res.status(500).send({message: "Error occur while making booking"});
    });
};