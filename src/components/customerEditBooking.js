import React, { Component } from "react";
import BookingDataService from "../services/booking-service";
import { Button, TextField } from "@material-ui/core";
import { Link, Switch, Route } from "react-router-dom";
import CustomerViewBooking from "../components/customerViewBookings";
import { Grid, ListItem } from "@material-ui/core";
import MealDataService from "../services/meal-service";

class EditMyBookings extends Component {
  constructor(props) {
    super(props);
    //Binding each attribute
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeSeats = this.onChangeSeats.bind(this);
    this.onVTime = this.onVTime.bind(this);
    this.getBooking = this.getBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    //Define Each Attribute
    this.state = {
      currentBooking: {
        id: null,
        date: "",
        time: "",
        username: "",
        active: true,
        seats: null,
        meals: [],
        totalcost: null,
        code: ""
      },
      verTime: false,
      message: "",
      quantity: null,
      menus: [],
      currentItem: null,
      currentIndex: -1,
      currentMenu:"",
      requiredS: false,
      requiredT: false
    };
  }

  componentDidMount() {
    //Finding Booking through URL
    const URL = String(this.props.location.pathname);
    const bookingId = String(
      URL.substring(URL.lastIndexOf("/") + 1, URL.length)
    );
    this.getBooking(bookingId);
  }

  retrieveMenu(type) {
    //Only display lunch menu if before it was at dinner time period 
    if (type === "Lunch" && this.state.currentMenu === "Dinner") {
      MealDataService.getAllLunchMeals()
        .then((response) => {
          this.setState({
            menus: response.data,
            quantity: null,
            currentMenu: "Lunch",
            currentBooking: {
                meals: [],
                totalcost: null
            }
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //Only display dinner menu if before it was at lunch time period 
    else if (type === "Dinner" && this.state.currentMenu === "Lunch") {
      MealDataService.getAllDinnerMeals()
        .then((response) => {
          this.setState({
            menus: response.data,
            quantity: null,
            currentMenu: "Dinner",
            currentBooking: {
                meals: [],
                totalCost: null
            }
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //Display lunch menu
    else if (type === "Lunch") {
      MealDataService.getAllLunchMeals()
        .then((response) => {
          this.setState({
            menus: response.data,
            quantity: null,
            currentMenu: "Lunch",
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //Display dinner menu
    else if (type === "Dinner") {
      MealDataService.getAllDinnerMeals()
        .then((response) => {
          this.setState({
            menus: response.data,
            quantity: null,
            currentMenu: "Dinner",
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  refreshList() {
    this.retrieveMenu();
    this.setState({
      currentItem: null,
      currentIndex: -1,
    });
  }

  setActiveAddItem(menu, index) {
    this.setState({
      currentItem: menu,
      currentIndex: index,
      quantity: null,
    });
  }

  onVTime(e) {
    this.setState({
      verTime: false,
      requiredT: false
    });
  }

  findSlot(value) {
    //Array for all the available Timeslot
    const lunchSlot = ["11:00", "12:00", "13:00", "14:00", "15:00"];
    const dinnerSlot = ["16:00", "17:00", "18:00", "19:00", "20;00", "21:00"];

    //Loop to check if it match the lunch timeslot
    for (let i = 0; i < lunchSlot.length; i++) {
      if (lunchSlot[i] === value) {
        return "Lunch";
      }
    }

    //Loop to check if it match the dinner timeslot
    for (let i = 0; i < dinnerSlot.length; i++) {
      if (dinnerSlot[i] === value) {
        return "Dinner";
      }
    }
    return "none";
  }

  onChangeTime(e) {
    //Find the correct menu for that time slot 
    const flag = this.findSlot(e.target.value);

    //If the time dont match any time slot means its not valid
    if (flag === "None") {
      this.setState(function (prevState) {
        return {
          currentBooking: {
            ...prevState.currentBooking,
            time: e.target.value,
          },
          verTime: true,
          requiredT: false
        };
      });
    }
    //Display the lunch menu
    else if (flag === "Lunch") {
      this.retrieveMenu(flag);
      this.setState(function (prevState) {
        return {
          currentBooking: {
            ...prevState.currentBooking,
            time: e.target.value,
          },
          verTime: false,
          requiredT: false
        };
      });
    }
    //Display Dinner Menu
    else if (flag === "Dinner") {
      this.retrieveMenu(flag);
      this.setState(function (prevState) {
        return {
          currentBooking: {
            ...prevState.currentBooking,
            time: e.target.value,
          },
          verTime: false,
          requiredT: false
        };
      });
    } else {
      return this.setState({
        verTime: true,
        requiredT: false
      });
    }
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeSeats(e) {
    this.setState(function (prevState) {
      return {
        currentBooking: {
          ...prevState.currentBooking,
          seats: e.target.value,
        },
      };
    });
    this.setState({
      requiredS: false
    });
  }

  addItem(item, itemQuantity) {
    //Calculate new price
    const newPrice = item.price * itemQuantity;
    //Create a menu item object
    var data = {
      _id: item._id,
      name: item.name,
      price: newPrice,
      ingredients: item.ingredients,
      menu: item.menu,
      quantity: itemQuantity,
    };

    //Push it to the meals list
    const list = this.state.currentBooking.meals;
    list.push(data);

    //Calculate total price
    var value = 0;
    for (let i = 0; i < list.length; i++) {
      value += list[i].price;
    }

    var symbol;
    var amount;

    //Getting the value and symbol
    for (let i = 0; i < this.state.currentBooking.code.length; i++) {
      if (this.state.currentBooking.code[i + 1] !== "O") {
        amount += this.state.currentBooking.code[i];
      }
      else {
        symbol = this.state.currentBooking.code[i];
        break;
      }
    }
    //Getting only the number part
    amount = amount.split("d");
    amount = amount[2];

    //Dollar sign means minus the amount
    if (symbol === "$") {
      value -= parseInt(amount);
    }
    //Means something % off
    else {
      value -= value * (parseInt(amount) / 100);
    }

    //Save value
    this.setState(function (prevState) {
      return {
        currentBooking: {
          ...prevState.currentBooking,
          meals: list,
          totalcost: value,
        },
        currentItem: null,
      };
    });
  }

  deleteItem(index) {
    //Pop the selected item
    const list = this.state.currentBooking.meals;
    list.splice(index, 1);

    //Calculate the total price
    var value = 0;
    for (let i = 0; i < list.length; i++) {
      value += list[i].price;
    }

    var symbol;
    var amount;

    //Getting the value and symbol
    for (let i = 0; i < this.state.currentBooking.code.length; i++) {
      if (this.state.currentBooking.code[i + 1] !== "O") {
        amount += this.state.currentBooking.code[i];
      }
      else {
        symbol = this.state.currentBooking.code[i];
        break;
      }
    }
    //Getting only the number part
    amount = amount.split("d");
    amount = amount[2];

    //Dollar sign means minus the amount
    if (symbol === "$") {
      value -= parseInt(amount);
    }
    //Means something % off
    else {
      value -= value * (parseInt(amount) / 100);
    }

    //Save value
    this.setState(function (prevState) {
      return {
        currentBooking: {
          ...prevState.currentBooking,
          meals: list,
          totalcost: value,
        },
        currentItem: null,
      };
    });
  }

  getBooking(id) {
    //Find booking
    BookingDataService.get(id)
      .then((response) => {
        this.setState({
          currentBooking: response.data,
        });
        console.log(response.data);
        //Find the correct menu for that time slot 
        this.retrieveMenu(this.findSlot(this.state.currentBooking.time));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateBooking() {
    if(this.state.time.length === 0) {
      this.setState({requiredT: true});
    }
    if(this.state.seats === null) {
      this.setState({requiredS: true});
    }
    if(this.state.requiredD !== true || this.state.requiredS !== true || this.state.requiredT !== true) {
      //Create booking object
      var data = {
        id: this.state.currentBooking._id,
        username: this.state.currentBooking.username,
        date: this.state.currentBooking.date,
        time: this.state.currentBooking.time,
        seats: this.state.currentBooking.seats,
        meals: this.state.currentBooking.meals,
        totalcost: this.state.currentBooking.totalcost,
        code: this.state.currentBooking.code
      };

      //Send booking object to backend
      BookingDataService.update(data)
        .then((response) => {
          console.log(response.data);
          this.setState({ verTime: false });
          this.setState({
            message: "The booking was updated successfully!",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  deleteBooking() {
    const bookingId = this.state.currentBooking._id;
    //Send booking Id to backend
    BookingDataService.delete(bookingId)
      .then((response) => {
        this.setState({ verTime: false });
        this.props.history.push(
          "/booking/my/" + this.state.currentBooking.username
        );
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBooking, menus, currentItem, currentIndex } = this.state;

    return (
      <div>
        {currentBooking ? (
          <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
            <hr className="new5"></hr>
            <h3>My Booking</h3>
            <form>
              <div>
                <label htmlFor="username">Booking Name</label>
                <TextField
                  type="text"
                  className="form-control"
                  name="username"
                  value={currentBooking.username}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="text">Date</label>
                <TextField
                  type="text"
                  className="form-control"
                  name="date"
                  value={currentBooking.date}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="time">Time</label>
                <TextField
                  type="time"
                  className="form-control"
                  name="time"
                  value={currentBooking.time}
                  onChange={this.onChangeTime}
                  onClick={this.onVTime}
                />
                {this.state.verTime ? (
                  <div className="alert alert-danger" role="alert">
                    Please pick a time between 11am-9pm.
                  </div>
                ) : (
                  <div></div>
                )}
                {this.state.requiredT ? (
                <div className="alert alert-danger" role="alert">
                  Please enter a time.
                </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <label htmlFor="seats">Seats</label>
                <TextField
                  type="number"
                  className="form-control"
                  name="seats"
                  value={currentBooking.seats}
                  onChange={this.onChangeSeats}
                />
                {this.state.requiredS ? (
                <div className="alert alert-danger" role="alert">
                  Please enter number of seats.
                </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <label className = "form-control">Redeem Code: {currentBooking.code}</label>
              </div>
              <div>
                <label className = "form-control">Total Cost: ${currentBooking.totalcost}</label>
              </div>
              <br />
              <div>
                <Grid container>
                  <Grid item md={4}>
                    <h4>Menu</h4>
                    <div className="list-group">
                      {menus &&
                        menus.map((menu, index) => (
                          <ListItem
                            style={{padding: "20px"}}
                            selected={index === currentIndex}
                            onClick={() => this.setActiveAddItem(menu, index)}
                            divider
                            button
                            key={index}
                          >
                            {" "}
                            {menu.name}, ${menu.price}{" "}
                          </ListItem>
                        ))}
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    {currentItem ? (
                      <div>
                        <h4>Item Selected</h4>
                        <div>
                          <label>
                            <strong>Name:</strong>
                          </label>{" "}
                          {currentItem.name}
                        </div>
                        <div>
                          <label htmlFor="quantity">Quantity</label>
                          <TextField
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.onChangeQuantity}
                            required
                          />
                        </div>
                        <br />
                        <Button
                          style={{
                            backgroundColor: "#d3d3af",
                            borderColor: "#d3d3af",
                            WebkitTextFillColor: "white",
                          }}
                          size="small"
                          variant="contained"
                          onClick={() =>
                            this.addItem(currentItem, this.state.quantity)
                          }
                        >
                          Add Item
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <h4>Added Items</h4>
                    <div className="list-group">
                      {currentBooking.meals.map((meal, index) => (
                        <ListItem
                          style={{padding: "20px" }}
                          selected={index === currentIndex}
                          onClick={() => this.deleteItem(index)}
                          divider
                          button
                          key={index}
                        >
                          {" "}
                          {meal.name}, qty: {meal.quantity}, ${meal.price}{" "}
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </div>
              <br />
              <div className="form-group" style={{ display: "inline-flex" }}>
                {currentBooking.active ? (
                  <div>
                    <Button onClick={this.deleteBooking}> Delete</Button>
                    <Button type="submit" onClick={this.updateBooking}>
                      {" "}
                      Update{" "}
                    </Button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <label>
                      <strong>Status: </strong>Past
                    </label>
                    <p>
                      <i>You cannot edit past bookings</i>
                    </p>
                  </div>
                )}
              </div>
              <br />
              <div style={{ display: "inline-block" }}>
                <Link
                  style={{ WebkitTextFillColor: "black" }}
                  to={"/booking/my/" + currentBooking.username}
                >
                  Go Back?
                </Link>
                <Switch>
                  <Route
                    exact
                    path={"/booking/my/" + currentBooking.username}
                    component={CustomerViewBooking}
                  />
                </Switch>
              </div>
            </form>
            <hr className="new5"></hr>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Booking...</p>
          </div>
        )}
      </div>
    );
  }
}

export default EditMyBookings;
