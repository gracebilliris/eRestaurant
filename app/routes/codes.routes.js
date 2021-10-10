module.exports = app => {
    const controller = require("../controllers/codes.controller.js");
    var router = require("express").Router();

    // Create a new Code
    router.post("/codes/create", controller.createCode);

    // Retrieves all Codes for Users on login
    router.get("/account", controller.findAllCodes);

    // Retrieves all Codes
    router.get("/codes", controller.findAllCodes);

    // Retrieves a single Code with id
    router.get("/codes/:id", controller.findOneCode);

    // Updates a Code with id
    router.put("/codes/:id", controller.updateCode);

    // Deletes a Code with id
    router.delete("/codes/:id", controller.deleteCode);

    app.use("/api", router);
};