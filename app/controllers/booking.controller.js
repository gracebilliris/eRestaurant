const db = require("../models");
const Booking = db.booking;
const User = db.user;

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
      User.findOne({username : req.body.username})
        .then(data => {
          if(!data) {
            res.status(500).send({message: "User can not be found."});
            return;
          }
          else {
            User.updateOne(
              {username: req.body.username},
              {
                $push : {bookings: booking}
              }
            ).then(data => {
              if(!data) {
                res.status(500).send({message: "Wasnt able to upload into user database."});
              }
              else {
                res.status(500).send({message: "Booking Made and added to: " + req.body.username});
              }
            })
            .catch(err => {
              res.status(500).send({message: "Error when Updating user"});
            })
          }
        })
        .catch(err => {
          res.status(500).send({message: "Error when finding user"});
          return;
        });

    })
    .catch(err => {
      res.status(500).send({message: "Error occur while making booking"});
    });
};