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

  if(req.body.code.length !== 0) {
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
      {active: "Active"},
      {active: "Current"}
    ]
  })
    .then((data) => {
      res.send(data);
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
    username: req.body.username,
  })
    .then((data) => {
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

// Update a Booking
exports.updateBooking = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  // Save Booking in the database
  Booking.updateOne(
    { username: req.body.username },
    {
      $set: {
        time: req.body.time,
        seats: req.body.seats,
        meals: req.body.meals,
        totalcost: req.body.totalcost,
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
    });
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
    });
};
