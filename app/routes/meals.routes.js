module.exports = app => {
    const controller = require("../controllers/meals.controller.js");
    var router = require("express").Router();

    // Retrieves all Meals
    router.get("/menuitems", controller.findAllMeals);

    // Retrieves a single Meal with id
    router.get("/menuitems/:id", controller.findOneMeal);

    // Updates a Meal with id
    router.put("/menuitems/:id", controller.updateMeal);

    // Retrieves all Lunch Meals
    router.get("/lunchmenu", controller.findAllLunchMeals);

    // Retrieves all Dinner Meals
    router.get("/dinnermenu", controller.findAllDinnerMeals);

    app.use("/api", router);
};