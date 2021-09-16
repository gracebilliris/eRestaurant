import React from "react";
import BookingDataService from "../services/booking-service";
import { Button, TextField } from "@material-ui/core"
import { Grid, ListItem } from "@material-ui/core";
import MealDataService from "../services/meal-service";

class CreateBooking extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeSeats = this.onChangeSeats.bind(this);
    this.onVTime = this.onVTime.bind(this);
    this.onVDate = this.onVDate.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.saveBooking = this.saveBooking.bind(this);

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
      verDate: false
    };
  }
  
  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({username: name});
  }

  retrieveMenu(type) {
    if (type === "Lunch") {
      MealDataService.getAllLunchMeals()
      .then(response => {
        this.setState({
          menus: response.data,
          addeditems: [],
          quantity: null,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    else if (type === "Dinner") {
      MealDataService.getAllDinnerMeals()
      .then(response => {
        this.setState({
          menus: response.data,
          addeditems: [],
          quantity: null
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    } 
  }

  refreshList() {
    this.retrieveMenu();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActiveAddItem(menu, index) {
    this.setState({
      currentItem: menu,
      currentIndex: index,
      quantity: null
    });
  }

  onChangeDate(e) {
     //Setting current date 
     let date_ob = new Date();
     let currentDay = parseInt(("0" + (date_ob.getDate())).slice(-2));
     let currentMonth = parseInt(("0" + (date_ob.getMonth() + 1)).slice(-2));
     let currentYear = parseInt(date_ob.getFullYear());
     
     //Setting enter date 
     const enterYear = parseInt(this.state.date.substr(0,4));
     const enterMonth = parseInt(this.state.date.substr(5,6));
     const enterDay = parseInt(this.state.date.substr(8,9));

    //If not chosen the right date and time
    if (enterDay <= currentDay &&  enterMonth <= currentMonth && enterYear <= currentYear) {
      return this.setState({verDate: true});
    }
    //Not chosen right date
    else {
      this.setState({
        date: e.target.value,
        verDate: false
      });
    }
  }

  onVTime(e) {
    this.setState({
      verTime: false
    });
  }

  onVDate(e) {
    this.setState({
      verDate: false
    });
  }

  onChangeTime(e) {
    //Array for all the available Timeslot
    const lunchSlot = ["11:00", "12:00", "13:00", "14:00", "15:00"];
    const dinnerSlot = ["16:00", "17:00", "18:00", "19:00", "20;00", "21:00"];

    //Loop to check if it match the timeslot 
    var flag = "none";
    for(let i = 0; i < lunchSlot.length; i++) {
      if (lunchSlot[i] === e.target.value) {
        flag = "Lunch";
      }
    }    

    for(let i = 0; i < dinnerSlot.length; i++) {
      if (dinnerSlot[i] === e.target.value) {
        flag = "Dinner";
      }
    }  

    if(flag === "None") {
      this.setState({
        verTime: true,
        time: e.target.value
      })
    }
    else if (flag === "Lunch"){
      this.retrieveMenu(flag);
      this.setState({
        time: e.target.value,
        verTime: false
      });
    }
    else if (flag === "Dinner") {
      this.retrieveMenu(flag);
      this.setState({
        time: e.target.value,
        verTime: false
      });
    }
    else {
      return this.setState({
        verTime: true
      });
    }
  }
  
  onChangeSeats(e) {
    this.setState({
      seats: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  addItem(item, itemQuantity){
    const newPrice = item.price * itemQuantity;
    var data = {
      _id  : item._id,
      name : item.name,
      price: newPrice,
      ingredients: item.ingredients,
      menu: item.menu,
      quantity: itemQuantity
    }

    const list = this.state.addeditems;
    list.push(data);

    this.setState({
      addeditems: list,
      currentItem: null
    });
  }

  deleteItem(index){
    const list = this.state.addeditems;
    list.pop(index);

    this.setState({
      addeditems: list,
      currentItem: null
    });
  }

  saveBooking(){
    var data = {
      username: this.state.username,
      time: this.state.time,
      date: this.state.date,
      seats: this.state.seats,
      meals: this.state.addeditems
    };

    BookingDataService.create(data, this.state.username)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          date: response.data.date,
          time: response.data.time,
          seats: response.data.seats,
          meals: response.data.meals,
          active: true,
          submitted: true
        });
          console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
      }
  
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
        verDate: false
    });
    this.componentDidMount();
  }
  
  render() {
    const { menus, currentItem, currentIndex, addeditems } = this.state;
    return (
      <div style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
        <hr className="new5"></hr>
        <h3 style={{color: "light grey"}}>Create Booking</h3>
        {this.state.submitted ? (
          <div>
              <p><i>You created a booking successfully!</i></p>
              <Button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white"}} size="small" variant="contained" onClick={this.newBooking}> Make a booking </Button>
          </div>
          ) : (
          <div>
              <div>
              <label htmlFor="username">Booking Name</label>
              <TextField type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeUsername} required disabled/>
          </div>
          <div>
              <label htmlFor="date">Date</label>
              <TextField type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChangeDate} onClick = {this.onVDate} required/>
              {this.state.verDate ? (<div className="alert alert-danger" role="alert">Please pick a date after the current date.</div>) : (<div></div>)}
          </div>
          <div>
              <label htmlFor="time">Time</label>
              <TextField type="time" className="form-control" name="time" value={this.state.time} onChange={this.onChangeTime} onClick = {this.onVTime} required/>
              {this.state.verTime ? (<div className="alert alert-danger" role="alert">Please pick a time between 11am-9pm.</div>) : (<div></div>)}
          </div>
          <div>
              <label htmlFor="seats">Seats</label>
              <TextField type="number" className="form-control" name="seats" value={this.state.seats} onChange={this.onChangeSeats} required/>
          </div>
          <br/>
          <div>
          <Grid container>
            <Grid item md={4}>
              <h4>Menu</h4>
              <div className="list-group">
                {menus && menus.map((menu, index) => (
                  <ListItem style={{}} selected={index === currentIndex} onClick={() => this.setActiveAddItem(menu, index)} divider button style={{padding: "20px"}} key={index}> {menu.name}, ${menu.price} </ListItem>
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
                    <TextField type="number" className="form-control" name="quantity" value={this.state.quantity} onChange={this.onChangeQuantity} required/>
                  </div>
                  <br/>
                  <Button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white"}}  size="small" variant="contained" onClick={() => this.addItem(currentItem, this.state.quantity)}>Add Item</Button>
                </div>
              ) : (<div></div>)}
            </Grid>
            <Grid item md={4}>
              <h4>Added Items</h4>
              <div className="list-group">
                {addeditems.map((addedItem, index) => (
                  <ListItem style={{}} selected={index === currentIndex} onClick={() => this.deleteItem(index)} divider button style={{padding: "20px"}} key={index}> {addedItem.name}, qty: {addedItem.quantity}, ${addedItem.price} </ListItem>
                ))}
              </div>
            </Grid>
          </Grid>
          </div>
          <br/>
          <Button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white"}}  size="small" variant="contained" onClick={this.saveBooking}>Submit</Button>
          <hr className="new5"></hr>
          </div>
          
        )}
      </div>
    );
  }
}

export default CreateBooking