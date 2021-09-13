const db = require("../models");
const Meal = require("../models/meal.model");

// Retrieve all Meals from the database.
exports.findAllMeals = (req, res) => {
  Meal.find()
  .then(data => {
      res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meals."
    });
  })
};

// Find a single Meal with an id
exports.findOneMeal = (req, res) => {
    const id = req.params.id;

    Meal.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Meal with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Meal with id=" + id });
      });
};

// Update a Meal by the id in the request
exports.updateMeal = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  const id = req.params.id;

  Meal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Meal with id=${id}. Maybe Staff was not found!`
        });
      } else res.send({ message: "Meal details were updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Meal with id=" + id
      });
    });
  };