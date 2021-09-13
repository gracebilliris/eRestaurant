module.exports = app => {
    const item = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Booking
    router.post("/addItem", item.addItem);
  
    // Retrieve all Bookings
    router.get("/view", item.findAllItems);
  
    // Retrieve a single Booking with id
    router.get("/my/:id", item.findOneItem);
  
    app.use('/api/item', router);
  };