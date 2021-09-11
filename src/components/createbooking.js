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
      submitted: false
    };
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
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
    var data = {
      username: this.state.username,
      time: this.state.time,
      date: this.state.date,
      seats: this.state.seats,
      // meals: this.state.meals
    };

    BookingDataService.create(data)
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

  newBooking = () => {
    this.setState({
        id: null,
        username: "",
        date: "",
        time: "",
        seats: "",
        // meals: "",
        active: false,
        submitted: false
    });
  }

  render() {
    return (
      <div style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
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
              <TextField type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeUsername} required/>
          </div>
          <div>
              <label htmlFor="date">Date</label>
              <TextField type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChangeDate} required/>
          </div>
          <div>
              <label htmlFor="time">Time</label>
              <TextField type="time" className="form-control" name="time" value={this.state.time} onChange={this.onChangeTime} required/>
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
          </div>
        )}
      </div>
    );
  }
}

export default CreateBooking