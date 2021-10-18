module.exports = app => {
  const bookings = require("../controllers/booking.controller.js");
  var router = require("express").Router();

  // Create a new Booking
  router.post("/create/:username", bookings.createBooking);

  // Retrieves all Bookings
  router.get("/view", bookings.findAllBookings);

  // Retrieves all Bookings by a particular Customer
  router.post("/my/:username", bookings.findCustomerBookings);

  // Retrieves a single Booking with id
  router.get("/my/:id", bookings.findOneBooking);

  // Updates a Booking with id
  router.put("/my/:id", bookings.updateBooking);

  // Deletes a Booking with id
  router.delete("/my/:id", bookings.deleteBooking);

  app.use('/api/booking', router);
};
