const Booking = require("../models/booking.model");

// Create and Save a new Booking
exports.createBooking = (req, res) => {
  // Create a booking
  const booking = new Booking({
    date: req.body.date,
    time: req.body.time,
    username: req.body.username,
    seats: parseInt(req.body.seats),
    meals: req.body.meals,
    totalcost: req.body.totalCost,
    code: "",
    active: "Active",
  });

  if (req.body.code.length !== 0) {
    booking.code = req.body.code;
  }

  //Save the booking
  booking.save((err, booking) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res
        .status(200)
        .send({
          message: "Booking Made and created for: " + req.body.username,
        });
    }
  });
};

// Retrieve all Bookings from the database.
exports.findAllBookings = (req, res) => {
  Booking.find({
    $or: [
      { active: "Active" },
      { active: "Current" }
    ]
  })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          var year1 = parseInt(data[j].date.substr(0, 4));
          var month1 = parseInt(data[j].date.substr(5, 6));
          var day1 = parseInt(data[j].date.substr(8, 9));

          var year2 = parseInt(data[j + 1].date.substr(0, 4));
          var month2 = parseInt(data[j + 1].date.substr(5, 6));
          var day2 = parseInt(data[j + 1].date.substr(8, 9));
          if (year1 >= year2 && month1 >= month2 && day1 > day2) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
          else if (year1 === year2 && month1 === month2 && day1 === day2) {
            var hour1 = parseInt(data[j].time.substr(0, 2));
            var hour2 = parseInt(data[j + 1].time.substr(0, 2));

            if (hour1 > hour2) {
              let temp = data[j];
              data[j] = data[j + 1];
              data[j + 1] = temp;
            }
          }
        }
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings.",
      });
    });
};

// Retrieve all Bookings by a certain Customer from the database.
exports.findCustomerBookings = (req, res) => {
  Booking.find({
    username: req.body.username
  })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          var year1 = parseInt(data[j].date.substr(0, 4));
          var month1 = parseInt(data[j].date.substr(5, 6));
          var day1 = parseInt(data[j].date.substr(8, 9));

          var year2 = parseInt(data[j + 1].date.substr(0, 4));
          var month2 = parseInt(data[j + 1].date.substr(5, 6));
          var day2 = parseInt(data[j + 1].date.substr(8, 9));
          if (year1 >= year2 && month1 >= month2 && day1 > day2) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
          else if (year1 === year2 && month1 === month2 && day1 === day2) {
            var hour1 = parseInt(data[j].time.substr(0, 2));
            var hour2 = parseInt(data[j + 1].time.substr(0, 2));

            if (hour1 > hour2) {
              let temp = data[j];
              data[j] = data[j + 1];
              data[j + 1] = temp;
            }
          }
        }
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings.",
      });
    });
};

// Find a single Booking with an id
exports.findOneBooking = (req, res) => {
  const id = req.params.id;

  Booking.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Booking with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Booking with id=" + id });
    });
};

// Update a Booking by the id in the request
exports.updateBooking = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  // First check if enough seats then add
  Booking.aggregate([
    {
      // Get the data from the date and time
      $match: {
        date: req.body.date,
        time: req.body.time,
      },
    },
    {
      // Group it based on data and sum the seats
      $group: {
        _id: "$date",
        totalSeats: {
          $sum: "$seats",
        },
      },
    },
  ]).exec(function (err, demo) {
    //Create a varriable which has the total sum of seats
    Booking.findOne({
      username: req.body.username,
    }).exec(function (err, Demo) {
      var totalSeats = 0;
      //If orginial their is no booking at that time or data just make the total seats the inputed value
      if (JSON.stringify(demo, undefined, 0).substr(34, 35).substr(0, 3).length !== 0) {
        totalSeats = parseInt(JSON.stringify(demo, undefined, 0).substr(34, 35).substr(0, 3)) + parseInt(req.body.seats);
      }
      else {
        totalSeats = parseInt(req.body.seats)
      }
      //If greater means not enough seats
      if (totalSeats > 150) {
        //If greater means not enough seats
        res
          .status(500)
          .send({
            message:
              "Not Enough seats pick a different date, time or number of seats",
          });
      } 
      else {
        // Save Booking in the database
        Booking.updateOne(
          { username: req.body.username },
          {
            $set: {
              time: req.body.time,
              seats: req.body.seats,
              meals: req.body.meals,
              totalcost: req.body.totalCost,
            },
          }
        )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Booking!`,
            });
          } else res.send({ message: "Booking was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Booking",
          });
        });
      }
    });
  });
};

// Delete a Booking with the specified id in the request
exports.deleteBooking = (req, res) => {
  const id = req.params.id;

  Booking.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`,
        });
      } else {
        res.send({
          message: "Booking was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Booking with id=" + id,
      });
    }
  );
};

// Find all Active Bookings
exports.findAllActive = (req, res) => {
  Booking.find({ active: "Active" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings.",
      });
    }
  );
};
