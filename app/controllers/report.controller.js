const Booking = require("../models/booking.model");

// Retrieve all Dates from the database.
exports.findAllDates = (req, res) => {
    Booking.distinct("date")
        .then((data) => {
            //Order the date in accending order using Bubble Sort
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    var year1 = parseInt(data[j].substr(0, 4));
                    var month1 = parseInt(data[j].substr(5, 6));
                    var day1 = parseInt(data[j].substr(8, 9));

                    var year2 = parseInt(data[j + 1].substr(0, 4));
                    var month2 = parseInt(data[j + 1].substr(5, 6));
                    var day2 = parseInt(data[j + 1].substr(8, 9));
                    if (year1 >= year2 && month1 >= month2 && day1 > day2) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }
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
    //Retreive all bookings at that date
    Booking.find({
        date: req.params.date
    })
        .then((data) => {
            //Assign values
            var totalCost = 0;
            var menuItems = [
                { name: "Chicken Caesar Salad", quantity: 0 },
                { name: "Honey Mustard Tuna and Sweet Potato Salad", quantity: 0 },
                { name: "Charcuterie Board", quantity: 0 },
                { name: "Lasagna", quantity: 0 },
                { name: "Beef Burger", quantity: 0 },
                { name: "Pizza d'Andre", quantity: 0 }
            ];

            //Go through each booking
            for (let i = 0; i < data.length; i++) {
                //Go through each menu item in the booking
                for (let j = 0; j < data[i].meals.length; j++) {
                    //Check if it is equal and add the quantity
                    for (let y = 0; y < menuItems.length; y++) {
                        if (menuItems[y].name === data[i].meals[j].name) {
                            menuItems[y].quantity += parseInt(data[i].meals[j].quantity);
                            break;
                        }
                    }
                }
                //Add the totoal cost
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
                    err.message || "Some error occurred while retrieving bookings.",
            });
        });
};