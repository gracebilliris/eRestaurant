const db = require("../models");
const { booking: Booking } = db;

// let date_ob = new Date();
// let currentdate = ("0" + (date_ob.getDate() + 1)).slice(-2);
// let month = ("0" + date_ob.getMonth() + 1).slice(-2);
// let year = date_ob.getFullYear();
// const currentDate = year + "-" + month + "-" + currentdate;

exports.createb = (req, res) => {
  //Create a book object
  const booking = new Booking({
    username: req.body.username,
    date: req.body.date,
    time: req.body.time,
    seats: req.body.seats
  });

  //First check if enough seats then add
  Booking.aggregate(
   [
     {
      //Get the data from the date and time
      '$match': {
        'date': req.body.date,
        'time': req.body.time
      }
      }, {
      //Group it based on data and sum the seats
      '$group': {
        '_id': '$date', 
        'totalSeats': {
          '$sum': '$seats'
        }
      }
    }
   ]
    ).exec(function (err, demo){
      //Create a varriable which has the total sum of seats
      const totalSeats = parseInt(JSON.stringify(demo, undefined, 0).substr(34, 35).substr(0,3)) + parseInt(booking.seats);
      
      //If greater means not enough seats
      if(totalSeats > 150) {//If greater means not enough seats
        res.status(500).send({message: "Not Enough seats pick a different date, time or number of seats"});
      }
      else {
        Booking.find({username: booking.username}, (err, data) => {
          if(err) {
            res.status(500).send({ message: err });
            return;
          }
          else if (data.length) {
            res.status(500).send({ message: "Account already have booking." });
            return;
          }
          else {
            //Save the booking
            booking.save((err, booking) => {
            if (err){
              res.status(500).send({ message: err});
              return;
            }
            else {    
              res.status(500).send({message: "Booking Made and created for: " + booking.username});
            }
          });
        }
      })
    }
  })
}

exports.editb = (req, res) => {
  //First check if enough seats then add
  Booking.aggregate(
    [
      {
        //Get the data from the date and time
       '$match': {
          'date': req.body.date,
          'time': req.body.time
        }
        }, {
        //Group it based on data and sum the seats
        '$group': {
          '_id': '$date', 
          'totalSeats': {
            '$sum': '$seats'
          }
        }
      }
    ]
    ).exec(function (err, demo){
      //Create a varriable which has the total sum of seats
      const totalSeats = parseInt(JSON.stringify(demo, undefined, 0).substr(34, 35).substr(0,3)) + parseInt(req.body.seats);
        
      //If greater means not enough seats
      if(totalSeats > 150) {
        res.status(500).send({message: "Not Enough seats pick a different date, time or number of seats"});
      }
      else {
        Booking.updateOne(
          {username: req.body.username}, 
          {
            $set: {
              date: req.body.date,
              time: req.body.time,
              seats: req.body.seats
            }
          }, (err, data) => {
            if (err) {
              res.status(500).send({message: "Could not edit booking"});
            } 
            else {
              res.status(500).send({message: "Booking details being Saved"});
            }
         }
        );
      }
    }
  )
};

exports.allmyb = (req, res) => {
  Booking.find({
    username: req.body.username
  }, (err, book) => {
    if(err) {
      res.status(500).send({ message: err });
      return;
    }
    else {
      res.status(200).send(book);
    }
  })
}