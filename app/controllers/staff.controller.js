const db = require("../models");
const User = require("../models/user.model");
const Role = require("../models/role.model");

// Retrieve all Staff from the database.
exports.findAllStaffUsers = (req, res) => {
  Role.find({name: "staff"})
  .then(data => {
    const staffId = data[0]._id
    User.find({roles: [staffId]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving staff."
      });
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving role: staff."
    });
  });
};

// Find a single Staff with an id
exports.findOneStaff = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Staff with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Staff with id=" + id });
      });
};

// Update a Staff by the id in the request
exports.updateStaff = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Staff with id=${id}. Maybe Staff was not found!`
        });
      } else res.send({ message: "Staff details were updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Staff with id=" + id
      });
    });
  };