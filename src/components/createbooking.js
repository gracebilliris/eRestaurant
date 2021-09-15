import React from "react";
import BookingDataService from "../services/booking-service";
import { Button, TextField } from "@material-ui/core"

class CreateBooking extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeSeats = this.onChangeSeats.bind(this);
    this.onVTime = this.onVTime.bind(this);
    this.onVDate = this.onVDate.bind(this);
    // this.onChangeMeals = this.onChangeMeals.bind(this);
    this.saveBooking = this.saveBooking.bind(this);
    this.saveBooking = this.saveBooking.bind(this);

    this.state = {
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

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
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
    this.setState({
      time: e.target.value
    });
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

  // onChangeMeals(e) {
  //   this.setState({
  //       meals: e.target.value
  //   });
  // }

  saveBooking(){
    //Array for all the available Timeslot
    const timeSlot = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20;00", "21:00"];
    //Setting current date 
    let date_ob = new Date();
    let currentDay = parseInt(("0" + (date_ob.getDate())).slice(-2));
    let currentMonth = parseInt(("0" + (date_ob.getMonth() + 1)).slice(-2));
    let currentYear = parseInt(date_ob.getFullYear());
    
    //Setting enter date 
    const enterYear = parseInt(this.state.date.substr(0,4));
    const enterMonth = parseInt(this.state.date.substr(5,6));
    const enterDay = parseInt(this.state.date.substr(8,9));
    
    //Loop to check if it match the timeslot 
    var flag = false;
    for(let i = 0; i < timeSlot.length; i++) {
      if (timeSlot[i] === this.state.time) {
        flag = true;
      }
    }
    
    //If not chosen the right date and time
    if (!flag && enterDay <= currentDay &&  enterMonth <= currentMonth && enterYear <= currentYear) {
      return this.setState({verTime: true, verDate: true});
    }
    //Not chosen right time
    else if (!flag){
      return this.setState({verTime: true});
    }
    //Not chosen right date
    else if (enterDay <= currentDay &&  enterMonth <= currentMonth && enterYear <= currentYear){
      return this.setState({verDate: true});
    }
    //Add to booking
    else {
      var data = {
        username: this.state.username,
        time: this.state.time,
        date: this.state.date,
        seats: this.state.seats,
        // meals: this.state.meals
      };

      BookingDataService.create(data, this.state.username)
        .then(response => {
            this.setState({
              id: response.data.id,
              username: response.data.username,
              date: response.data.date,
              time: response.data.time,
              seats: response.data.seats,
              // meals: response.data.meals,
              active: true,
              submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
      }
    }
    newBooking = () => {
      this.setState({
          id: null,
          username: "",
          date: "",
          time: "",
          seats: "",
          // meals: "",
          active: false,
          submitted: false,
          verTime: false,
          verDate: false
      });
    }
  
  render() {

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
          {/* <div>
              <label htmlFor="menuItems">Menu Items</label>
              <select name="meals" size="4" multiple value={menuItems} value={this.state.meals} onChange={this.onChangeMeals} required>
                <option value="casearSalad">Casear Salad</option>
                <option value="lasagna">Lasagna</option>
              </select>
          </div> */}
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