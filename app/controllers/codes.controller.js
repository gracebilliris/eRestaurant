const db = require("../models");
const Code = require("../models/code.model");

// Retrieve all Codes from the database
exports.findAllCodes = (req, res) => {
  Code.find()
  .then(data => {
      res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving codes."
    });
  })
};

// Find a single Code with an id
exports.findOneCode = (req, res) => {
  const id = req.params.id;

  Code.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Code with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Code with id=" + id });
    });
};

// Update a Code by the id in the request
exports.updateCode = (req, res) => {
if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
const id = req.params.id;

Code.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Code with id=${id}. Maybe Code was not found!`
      });
    } else res.send({ message: "Code details were updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Code with id=" + id
    });
  });
};
