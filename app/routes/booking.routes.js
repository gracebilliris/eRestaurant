module.exports = app => {
    const booking = require("../controllers/booking.controller");

    var router = require("express").Router();

    //Create new booking
    router.post("/", booking.create);

    app.use('/api/auth/booking', router);
}

