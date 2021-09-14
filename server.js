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
const Item = require("./app/models/item.model");
const Role = db.role;

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
require('./app/routes/booking.routes')(app);
require('./app/routes/item.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// add roles and items to database
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
    }

      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
  });

  Item.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Item({
        name: "Chicken Caesar Salad",
        ingredients: "boiled eggs, parmesan, caesar dressing, croutons, chicken breast and lettuce",
        price: 20,
        type: "lunchmenu"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Chicken Caesar Salad to Items collection");
      });

      new Item({
        name: "Charcuterie Board",
        ingredients: "walnuts, gherkins, figs, grapes, pomengrate, olives, brie cheese, cheddar cheese, salami, prosciutto, ham and bread sticks",
        price: 30,
        type: "lunchmenu"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Charcuterie Board to Items collection");
      });

      new Item({
        name: "Honey Mustard Tuna and Sweet Potato Salad",
        ingredients: "sweet potato, salad leaves, tuna, mustard and honey",
        price: 20,
        type: "lunchmenu"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Honey Mustard Tuna and Sweet Potato Salad to Items collection");
      });

      new Item({
        name: "Lasagna",
        ingredients: "onion, carrot, garlic, beef mince, tomatoes, butter, mozzarella and oregano",
        price: 20,
        type: "Dinner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Lasagna to Items collection");
      });

      new Item({
        name: "Beef Burger",
        ingredients: "tomato, lettuce, red onion, beed, broiche bun and aioli sauce",
        price: 20,
        type: "Dinner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Beef Burger to Items collection");
      });

      new Item({
        name: "Pizza d'Andre",
        ingredients: "cherry tomatoes, olives, mushrooms, salami, bocconcini, mozzarella cheese and mint leaves",
        price: 25,
        type: "Dinner"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Pizza d'Andre to Items collection");
      });
    }
  });

  //Updating status of the booking
  //Setting current date 
  let date_ob = new Date();
  let currentDay = parseInt(("0" + (date_ob.getDate())).slice(-2));
  let currentMonth = parseInt(("0" + (date_ob.getMonth() + 1)).slice(-2));
  let currentYear = parseInt(date_ob.getFullYear());

 //Finding all the booking with active status 
 Booking.find({
   active: true,
 }).exec(async (err, booking) => {
   //Go through each booking
   for (let i = 0; i < booking.length; i++) {
     
     //Getting the enter date 
     var enterYear = parseInt(String(booking[i].date).substr(0,4));
     var enterMonth = parseInt(String(booking[i].date).substr(5,6));
     var enterDay = parseInt(String(booking[i].date).substr(8,9));

     //Check if date is not the current or past if it is change active to past 
     if(enterDay <= currentDay &&  enterMonth <= currentMonth && enterYear <= currentYear){
       Booking.updateOne(
         {_id: booking[i]._id},
         {$set: {active: false}}
       )
     }
   }
 });
}