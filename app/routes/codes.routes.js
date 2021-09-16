module.exports = app => {
    const controller = require("../controllers/codes.controller.js");

    var router = require("express").Router();

    // Create a new Booking
    router.post("/codes/create", controller.createCode);

    // Retrieve all Codes
    router.get("/account", controller.findAllCodes);

    // Retrieve all Codes
    router.get("/codes", controller.findAllCodes);

    // Retrieve a single Code with id
    router.get("/codes/:id", controller.findOneCode);

    // Update a Code with id
    router.put("/codes/:id", controller.updateCode);

    // Delete a Code with id
    router.delete("/codes/:id", controller.deleteCode);

    app.use("/api", router);
};