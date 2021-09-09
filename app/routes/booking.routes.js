const controller = require("../controllers/booking.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
      
    //Create new booking
    app.post("/api/auth/booking", 
    controller.createb);
}

// Retrieve all bookings
//   router.get("/", booking.findAll);