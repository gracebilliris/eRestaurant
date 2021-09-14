const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.meal = require("./meal.model");
db.refreshToken = require("./refreshToken.model");
db.booking = require("./booking.model");
db.code = require("./code.model");

db.CODES = ["10$OFF", "WELCOME","5%OFF"]
db.ROLES = ["user", "staff", "manager", "owner"];
db.MEALS = ["Chicken Caesar Salad", "Charcuterie Board", "Honey Mustard Tuna and Sweet Potato Salad", "Lasagna", "Beef Burger", "Pizza d'Andre"];

module.exports = db;