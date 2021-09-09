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
    app.post("/api/auth/booking",controller.createb);

   //Edit booking
   // app.post("/api/auth/booking",controller.editb);

   //Get 1 booking
   // app.post("/api/auth/booking",controller.displaycurrentb);

   //Get all booking
   // app.post("/api/auth/booking",controller.allb);
}
