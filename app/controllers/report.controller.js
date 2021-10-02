const Booking = require("../models/booking.model");

// Retrieve all Dates from the database.
exports.findAllDates = (req, res) => {
  Booking.distinct("date")
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving dates.",
        });
      });
};

// Retrieve all menu items/totalcost by a certain Date from the database.
exports.findDateItems = (req, res) => {
    Booking.find({
        date: req.params.date
    })
    .then((data) => {
        //console.log(data);
        var totalCost = 0;
        var menuItems = [
            {name: "Chicken Caesar Salad", quantity: 0},
            {name: "Honey Mustard Tuna and Sweet Potato Salad", quantity: 0},
            {name: "Charcuterie Board", quantity: 0},
            {name: "Lasagna", quantity: 0},
            {name: "Beef Burger", quantity: 0},
            {name: "Pizza d'Andre", quantity: 0}
        ];

        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].meals.length; j++) {
                for(let y = 0; y < menuItems.length; y++) {
                    if(menuItems[y].name === data[i].meals[j].name) {
                        menuItems[y].quantity += parseInt(data[i].meals[j].quantity);
                        break;
                    }
                }
            }
            totalCost += data[i].totalcost
        }
        var sendData = {
            totalcost: totalCost,
            meals: menuItems
        }
        res.status(200).send(sendData);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving dates.",
        });
    });
//   Booking.find({
//     username: req.body.username,
//   })
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving bookings.",
//       });
//     });
};