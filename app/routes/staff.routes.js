module.exports = app => {
    const controller = require("../controllers/staff.controller.js");
    var router = require("express").Router();

    // Retrieve all Staff users
    router.get("/staffdetails", controller.findAllStaffUsers);

    // Retrieve a single Staff with id
    router.get("/staffdetails/:id", controller.findOneStaff);

    // Update a Staff with id
    router.put("/staffdetails/:id", controller.updateStaff);

    app.use("/api", router);
};