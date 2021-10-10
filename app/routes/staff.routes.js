module.exports = app => {
    const controller = require("../controllers/staff.controller.js");
    var router = require("express").Router();

    // Retrieves all Staff users' details
    router.get("/staffdetails", controller.findAllStaffUsers);

    // Retrieves a single Staff with id
    router.get("/staffdetails/:id", controller.findOneStaff);

    // Updates a Staff with id
    router.put("/staffdetails/:id", controller.updateStaff);

    app.use("/api", router);
};