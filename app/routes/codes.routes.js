module.exports = app => {
    const controller = require("../controllers/codes.controller.js");

    var router = require("express").Router();

    // Retrieve all Codes
    router.get("/account", controller.findAllCodes);

    // Retrieve all Codes
    router.get("/codes", controller.findAllCodes);

    // Retrieve a single Code with id
    router.get("/codes/:id", controller.findOneCode);

    // Update a Code with id
    router.put("/codes/:id", controller.updateCode);

    app.use("/api", router);
};