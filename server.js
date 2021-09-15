const express = require("express");
// express is for building the REST APIs
const bodyParser = require("body-parser");
// body-parser helps to parse the request and create the req.body object
const cors = require("cors");
// cors provides Express middleware to enable CORS

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const User = require("./app/models/user.model");
const Booking = require("./app/models/booking.model");
const Role = db.role;
const Meal = db.meal;
const Code = db.code;

db.mongoose
  .connect(`mongodb://localhost:27017/eRestaurant`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to eRestaurant backend." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/meals.routes')(app);
require('./app/routes/staff.routes')(app);
require('./app/routes/booking.routes')(app);
require('./app/routes/codes.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// add roles & meals & codes to database
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "staff"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'staff' to roles collection");
      });

      new Role({
        name: "manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'manager' to roles collection");
      });
      
      new Role({
        name: "owner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'owner' to roles collection");
      });

      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
    }
  });

  Meal.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Meal({
        name: "Chicken Caesar Salad",
        price: 20,
        ingredients: "boiled eggs, parmesan, caesar dressing, croutons, chicken breast and lettuce",
        menu: "Lunch"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Chicken Caesar Salad' to meals collection");
      });

      new Meal({
        name: "Charcuterie Board",
        price: 30,
        ingredients: "walnuts, gherkins, figs, grapes, pomengrate, olives, brie cheese, cheddar cheese, salami, prosciutto, ham and bread sticks",
        menu: "Lunch"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Charcuterie Board' to meals collection");
      });

      new Meal({
        name: "Honey Mustard Tuna and Sweet Potato Salad",
        price: 20,
        ingredients: "sweet potato, salad leaves, tuna, mustard and honey",
        menu: "Lunch"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Honey Mustard Tuna and Sweet Potato Salad' to meals collection");
      });

      new Meal({
        name: "Lasagna",
        price: 20,
        ingredients: "onion, carrot, garlic, beef mince, tomatoes, butter, mozzarella and oregano",
        menu: "Dinner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Lasagna' to meals collection");
      });

      new Meal({
        name: "Beef Burger",
        price: 20,
        ingredients: "tomato, lettuce, red onion, beed, broiche bun and aioli sauce",
        menu: "Dinner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Beef Burger' to meals collection");
      });

      new Meal({
        name: "Pizza d'Andre",
        price: 25,
        ingredients: "cherry tomatoes, olives, mushrooms, salami, bocconcini, mozzarella cheese and mint leaves",
        menu: "Dinner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Pizza d'Andre' to meals collection");
      });
    }
  });

  Code.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Code({
        name: "10$OFF"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added '10$OFF' to codes collection");
      });

      new Code({
        name: "WELCOME"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'WELCOME' to codes collection");
      });
      
      new Code({
        name: "5%OFF"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added '5%OFF' to codes collection");
      });
    }
  });
}