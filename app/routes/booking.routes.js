module.exports = app => {
  const bookings = require("../controllers/booking.controller.js");
  var router = require("express").Router();

  // Create a new Booking
  router.post("/create/:username", bookings.createBooking);

  // Retrieve all Bookings
  router.get("/view", bookings.findAllBookings);

  // Retrieve all Bookings by a Customer
  router.post("/my/:username", bookings.findCustomerBookings);

  // Retrieve a single Booking with id
  router.get("/my/:id", bookings.findOneBooking);

  // Update a Booking with id
  router.put("/my/:id", bookings.updateBooking);

  // Delete a Booking with id
  router.delete("/my/:id", bookings.deleteBooking);

  app.use('/api/booking', router);
};
