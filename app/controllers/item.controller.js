const Item = require("../models/item.model");

// Create and Save a new Booking
exports.addItem = (req, res) => {
  const item = new Item({
      name: req.body.name,
      ingredients: req.body.ingredients,
      price: parseFloat(req.body.price),
      type: req.body.type
  });

  item.save((err, item) => {
    if (err){
      console.log(err);
    }
    else {   
      console.log(req.body.name + " being added."); 
    }
  });
};

// Retrieve all Item from the database.
exports.findAllItems = (req, res) => {
  Item.find({
      type: req.body.type
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Items."
    });
  });
};

// Find a single Item with an id
exports.findOneItem = (req, res) => {
    const id = req.params.id;

    Item.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Item with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Item with id=" + id });
      });
};