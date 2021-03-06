import React from "react";
import BookingDataService from "../services/booking-service";
import { Button, Input } from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import MealDataService from "../services/meal-service";
import CodeDataService from "../services/code-service";

class CreateBooking extends React.Component {
  constructor(props) {
    super(props);
    // Binding each attribute
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeSeats = this.onChangeSeats.bind(this);
    this.onChangeTotalCost = this.onChangeTotalCost.bind(this);
    this.onVTime = this.onVTime.bind(this);
    this.onVDate = this.onVDate.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.saveBooking = this.saveBooking.bind(this);

    // Defining each attribute
    this.state = {
      menus: [],
      addeditems: [],
      quantity: null,
      currentItem: null,
      currentIndex: -1,
      id: null,
      username: "",
      date: "",
      time: "",
      seats: null,
      active: true,
      submitted: false,
      verTime: false,
      verDate: false,
      totalCost: null,
      code: "",
      codeList: null,
      requiredD: false,
      requiredS: false,
      requiredT: false,
      regexp: /^[0-9]+$/,
      verSeats: false,
      verQuantity: false,
      vSeats: false
    };
  }

  componentDidMount() {
    // Finding User through URL
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
    this.retrieveCode();
  }

  retrieveCode() {
    CodeDataService.getAllCodes()
      .then((response) => {
        this.setState({
          codeList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveMenu(type) {
    //Display lunch menu
    if (type === "Lunch") {
      MealDataService.getAllLunchMeals()
        .then((response) => {
          this.setState({
            menus: response.data,
            addeditems: [],
            quantity: null,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        }
        );
    }
    //Display Dinner Menu
    else if (type === "Dinner") {
      MealDataService.getAllDinnerMeals()
        .then((response) => {
          this.setState({
            menus: response.data,
            addeditems: [],
            quantity: null,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        }
        );
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

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
      verDate: false,
      requiredD: false
    });
  }

  onVTime(e) {
    this.setState({
      verTime: false,
      requiredT: false
    });
  }

  onVSeats(e) {
    this.setState({
      verSeats: false,
      requiredS: false
    });
  }

  onVQuantity(e) {
    this.setState({
      verQuantity: false
    });
  }

  onVDate(e) {
    this.setState({
      verDate: false,
      requiredD: false
    });
  }

  onChangeTime(e) {
    //Array for all the available Timeslot
    const lunchSlot = ["11:00", "12:00", "13:00", "14:00", "15:00"];
    const dinnerSlot = ["16:00", "17:00", "18:00", "19:00", "20;00", "21:00"];

    //Loop to check if it match the Lunch timeslot
    var flag = "none";
    for (let i = 0; i < lunchSlot.length; i++) {
      if (lunchSlot[i] === e.target.value) {
        flag = "Lunch";
      }
    }

    //Loop to check if it match the Dinner timeslot
    for (let i = 0; i < dinnerSlot.length; i++) {
      if (dinnerSlot[i] === e.target.value) {
        flag = "Dinner";
      }
    }

    //If the time dont match any time slot means its not valid
    if (flag === "None") {
      this.setState({
        verTime: true,
        time: e.target.value,
        requiredT: false
      });
    }
    //Display the lunch menu
    else if (flag === "Lunch") {
      this.retrieveMenu(flag);
      this.setState({
        time: e.target.value,
        verTime: false,
        requiredT: false
      });
    }
    //Display Dinner Menu
    else if (flag === "Dinner") {
      this.retrieveMenu(flag);
      this.setState({
        time: e.target.value,
        verTime: false,
        requiredT: false
      });
    }
    else {
      return this.setState({
        verTime: true,
        requiredT: false
      });
    }
  }

  onChangeSeats(e) {
    if (this.state.regexp.test(e.target.value)) {
      this.setState({
        seats: e.target.value,
        verSeats: false,
        requiredS: false,
        vSeats: false
      });
    }
    else {
      this.setState({
        verSeats: true,
        requiredS: false,
        vSeats: false
      });
    }
  }

  onChangeCode(e) {
    var value = 0;
    if (this.state.addeditems.length !== 0 && e.target.value !== "null") {
      //Calculate the total price
      for (let i = 0; i < this.state.addeditems.length; i++) {
        value += this.state.addeditems[i].price;
      }

      var symbol;
      var amount;

      //Getting the value and symbol
      for (let i = 0; i < this.state.codeList[e.target.value].name.length; i++) {
        if (this.state.codeList[e.target.value].name[i + 1] !== "O") {
          amount += this.state.codeList[e.target.value].name[i];
        }
        else {
          symbol = this.state.codeList[e.target.value].name[i];
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

      this.setState({
        code: e.target.value,
        totalCost: value
      });
    }
    else if (e.target.value === "null") {
      if (this.state.addeditems.length !== 0) {
        for (let i = 0; i < this.state.addeditems.length; i++) {
          value += this.state.addeditems[i].price;
        }
      }

      this.setState({
        totalCost: value,
        code: ""
      });
    }
    else {
      this.setState({
        code: e.target.value,
      });
    }
  }

  onChangeTotalCost(e) {
    this.setState({
      totalCost: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeQuantity(e) {
    if (this.state.regexp.test(e.target.value)) {
      this.setState({
        quantity: e.target.value,
        verQuantity: false
      });
    }
    else {
      this.setState({
        verQuantity: true
      });
    }
  }

  addItem(item, itemQuantity) {
    //Calulcate new price
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

    //Push it to addeditem list
    const list = this.state.addeditems;
    list.push(data);

    //Calculate total price
    var value = 0;
    for (let i = 0; i < list.length; i++) {
      value += list[i].price;
    }

    if (this.state.code.length !== 0 && this.state.code !== "null") {
      var symbol;
      var amount;

      //Getting the value and symbol
      for (let i = 0; i < this.state.codeList[this.state.code].name.length; i++) {
        if (this.state.codeList[this.state.code].name[i + 1] !== "O") {
          amount += this.state.codeList[this.state.code].name[i];
        }
        else {
          symbol = this.state.codeList[this.state.code].name[i];
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
    }

    //Save Value
    this.setState({
      addeditems: list,
      currentItem: null,
      totalCost: value,
    });
  }

  deleteItem(index) {
    //Pop the selected item
    const list = this.state.addeditems;
    list.splice(index, 1);

    //Calculate total price
    var value = 0;
    for (let i = 0; i < list.length; i++) {
      value += list[i].price;
    }

    if (this.state.code.length !== 0 && this.state.code !== "null") {
      var symbol;
      var amount;

      //Getting the value and symbol
      for (let i = 0; i < this.state.codeList[this.state.code].name.length; i++) {
        if (this.state.codeList[this.state.code].name[i + 1] !== "O") {
          amount += this.state.codeList[this.state.code].name[i];
        }
        else {
          symbol = this.state.codeList[this.state.code].name[i];
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
    }

    //Save Value
    this.setState({
      addeditems: list,
      currentItem: null,
      totalCost: value,
    });
  }

  saveBooking() {
    if (this.state.date.length === 0) {
      this.setState({ requiredD: true });
    }
    if (this.state.time.length === 0) {
      this.setState({ requiredT: true });
    }
    if (this.state.seats === null) {
      this.setState({ requiredS: true });
    }

    //If not chosen the right date and time
    if (this.state.requiredD !== true && this.state.requiredS !== true && this.state.time.length !== 0 && this.state.verTime !== true && this.state.verSeats !== true) {
      //Setting current date
      let date_ob = new Date();
      let currentDay = parseInt(("0" + date_ob.getDate()).slice(-2));
      let currentMonth = parseInt(("0" + (date_ob.getMonth() + 1)).slice(-2));
      let currentYear = parseInt(date_ob.getFullYear());

      //Setting enter date
      const enterYear = parseInt(this.state.date.substr(0, 4));
      const enterMonth = parseInt(this.state.date.substr(5, 6));
      const enterDay = parseInt(this.state.date.substr(8, 9));

      //If Chosen past year or current year with past month and days
      if (enterYear < currentYear || (enterYear === currentYear && enterMonth <= currentMonth && enterDay <= currentDay)) {
        return this.setState({ verDate: true });
      }
      else {
        BookingDataService.getAll()
          .then((res) => {
            var numSeats = 0;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].date === this.state.date && res.data[i].time === this.state.time) {
                numSeats += parseInt(res.data[i].seats);
              }
            }
            numSeats += parseInt(this.state.seats);
            if (numSeats > 150) {
              this.setState({
                vSeats: true
              })
            }
            else {
              //Create booking object
              var data;
              if (this.state.code.length !== 0) {
                data = {
                  username: this.state.username,
                  time: this.state.time,
                  date: this.state.date,
                  seats: this.state.seats,
                  meals: this.state.addeditems,
                  totalCost: this.state.totalCost,
                  code: this.state.codeList[this.state.code].name
                };
              }
              else {
                data = {
                  username: this.state.username,
                  time: this.state.time,
                  date: this.state.date,
                  seats: this.state.seats,
                  meals: this.state.addeditems,
                  totalCost: this.state.totalCost,
                  code: ""
                };
              }

              //Send booking object to backend
              BookingDataService.create(data, this.state.username)
                .then((response) => {
                  this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    date: response.data.date,
                    time: response.data.time,
                    seats: response.data.seats,
                    meals: response.data.meals,
                    active: true,
                    submitted: true,
                    totalCost: response.data.totalCost,
                    code: response.data.code
                  });
                  console.log(response.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
      }
    }
  }

  //Create a new booking page
  newBooking = () => {
    this.setState({
      id: null,
      date: "",
      time: "",
      seats: "",
      menus: [],
      addeditems: [],
      quantity: null,
      currentItem: null,
      active: false,
      submitted: false,
      verTime: false,
      verDate: false,
      totalCost: null,
      code: "",
      verSeats: false,
      requiredD: false,
      requiredS: false,
      requiredT: false,
      verQuantity: false,
      vSeats: false
    });
    this.componentDidMount();
  };

  render() {
    const { menus, currentItem, currentIndex, addeditems } = this.state;
    return (
      <div style={{ textAlign: "center", maxWidth: "100%", fontFamily: "Times New Roman" }} className="form">
        <hr className="new5"></hr>
        <h3 style={{ color: "light grey" }}>Create Booking</h3>
        {this.state.submitted ? (
          <div>
            <p>
              <i>You created a booking successfully!</i>
            </p>
            <Button style={{ backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white" }} size="small" variant="contained" onClick={this.newBooking}>
              {" "}Make a booking{" "}
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <label htmlFor="username">Booking Name</label>
              <Input style={{fontFamily: "Times New Roman"}} type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeUsername} disabled />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <Input style={{fontFamily: "Times New Roman"}} aria-label="date" role="textbox" type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChangeDate} onClick={this.onVDate} />
              {this.state.verDate ? (
                <div className="alert alert-danger" role="alert">Please pick a date after the current date.</div>
              ) : (
                <div></div>
              )}
              {this.state.requiredD ? (
                <div className="alert alert-danger" role="alert">Please enter a date.</div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <Input style={{fontFamily: "Times New Roman"}} aria-label="time" role="textbox" type="time" className="form-control" name="time" value={this.state.time} onChange={this.onChangeTime} onClick={this.onVTime} />
              {this.state.verTime ? (
                <div className="alert alert-danger" role="alert">Please pick a time between 11am-9pm.</div>
              ) : (
                <div></div>
              )}
              {this.state.requiredT ? (
                <div className="alert alert-danger" role="alert">Please enter a time.</div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <label htmlFor="seats">Seats</label>
              <Input style={{fontFamily: "Times New Roman"}} aria-label="seats" role="textbox" type="number" className="form-control" name="seats" value={this.state.seats} onChange={this.onChangeSeats} />
              {this.state.verSeats ? (
                <div className="alert alert-danger" role="alert">Please enter numbers only.</div>
              ) : (
                <div></div>
              )}
              {this.state.requiredS ? (
                <div className="alert alert-danger" role="alert">Please enter number of seats.</div>
              ) : (
                <div></div>
              )}
              {this.state.vSeats ? (
                <div className="alert alert-danger" role="alert">Not Enough seats pick a different date, time or number of seats.</div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <label htmlFor="username">Redeem Code: </label>
              <select style={{ marginLeft: "5px" }} value={this.state.code} onChange={this.onChangeCode}>
                <option selected value={"null"} />
                ({this.state.codeList && this.state.codeList.map((codes, index) => (
                  <option value={index} >{codes.name}</option>
                ))})
              </select>
            </div>
            <div>
              <label className="form-control">Total Cost: ${this.state.totalCost}</label>
            </div>
            <br />
            <div>
              <Grid container>
                <Grid item md={4}>
                  <h4>Menu</h4>
                  <div className="list-group">
                    {menus &&
                      menus.map((menu, index) => (
                        <ListItem style={{ padding: "20px" }} selected={index === currentIndex} onClick={() => this.setActiveAddItem(menu, index)} divider button key={index}>
                          {" "}{menu.name}, ${menu.price}{" "}
                        </ListItem>
                      ))}
                  </div>
                </Grid>
                <Grid item md={4}>
                  {currentItem ? (
                    <div>
                      <h4>Item Selected</h4>
                      <div>
                        <label><strong>Name:</strong></label>{" "}{currentItem.name}
                      </div>
                      <div>
                        <label htmlFor="quantity">Quantity</label>
                        <Input style={{fontFamily: "Times New Roman"}} aria-label="quantity" role="textbox" type="number" className="form-control" name="quantity" value={this.state.quantity} onChange={this.onChangeQuantity} required />
                        {this.state.verQuantity ? (
                          <div className="alert alert-danger" role="alert">Please enter numbers only.</div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <br />
                      <Button
                        style={{ backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white" }} size="small" variant="contained" onClick={() => this.addItem(currentItem, this.state.quantity)}>
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
                    {addeditems.map((addedItem, index) => (
                      <ListItem style={{ padding: "20px" }} selected={index === currentIndex} onClick={() => this.deleteItem(index)} divider button key={index}>
                        {" "}{addedItem.name}, qty:{addedItem.quantity}, ${addedItem.price}{" "}
                      </ListItem>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
            <br />
            <br />
            <Button
              style={{ backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white" }} size="small" variant="contained" onClick={this.saveBooking}>
              Submit
            </Button>
            <hr className="new5"></hr>
          </div>
        )}
      </div>
    );
  }
}

export default CreateBooking;