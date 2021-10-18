module.exports = app => {
  const report = require("../controllers/report.controller.js");
  var router = require("express").Router();

    // Retrieves all financials for all Dates
    router.get("/view", report.findAllDates);
  
    // Retrieves all financials on a particular date
    router.get("/my/:date", report.findDateItems);
  
    app.use('/api/report', router);
  };
