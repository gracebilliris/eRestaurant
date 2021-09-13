module.exports = app => {
    const controller = require("../controllers/meals.controller.js");

    var router = require("express").Router();

    // Retrieve all Meals
    router.get("/menuitems", controller.findAllMeals);

    // Retrieve a single Meal with id
    router.get("/menuitems/:id", controller.findOneMeal);

    // Update a Meal with id
    router.put("/menuitems/:id", controller.updateMeal);

    app.use("/api", router);
};