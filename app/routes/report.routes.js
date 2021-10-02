module.exports = app => {
    const report = require("../controllers/report.controller.js");
  
    var router = require("express").Router();

    // Retrieve all Dates
    router.get("/view", report.findAllDates);
  
    // Retrieve all Menu items/totalcost on that date
    router.get("/my/:date", report.findDateItems);
  
    app.use('/api/report', router);
  };