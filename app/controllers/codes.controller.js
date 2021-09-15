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

// Create and Save a new Code
exports.createCode = (req, res) => {
  Code.findOne({ name: req.body.name })
  .exec((err, response) => {
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    if(response){
      res.status(500).send({ message: 'Code name already exists!' });
    }
    else{
      // Create new Code
      const code = new Code({
        name: req.body.name,
        description: req.body.description,
      });

      code.save((err, code) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if(code){
          res.status(200).send({
            id: code._id,
            name: code.name,
            description: code.description
          });
        }
      });
    }
  })
};

// Delete a Code with the specified id in the request
exports.deleteCode = (req, res) => {
  const id = req.params.id;

  Code.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Code with id=${id}. Maybe Code was not found!`
        });
      } else {
        res.send({
          message: "Code was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Code with id=" + id
      });
    });
};