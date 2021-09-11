import React, { Component } from "react";
import BookingDataService from "../services/booking-service";
import { Link, Switch, Route } from "react-router-dom";
import { Grid, ListItem } from "@material-ui/core";
import CustomerEditBooking from "../components/customerEditBooking";

class ViewMyBookings extends Component {
  constructor(props) {
    super(props);
    this.retrieveBookings = this.retrieveBookings.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBooking = this.setActiveBooking.bind(this);
    this.state = {
      bookings: [],
      currentBooking: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    const username = { username: name}
    this.retrieveBookings(username);
  }

  retrieveBookings(username) {
    BookingDataService.getByUsername(username)
      .then(response => {
        this.setState({
          bookings: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBookings();
    this.setState({
      currentBooking: null,
      currentIndex: -1
    });
  }

  setActiveBooking(booking, index) {
    this.setState({
      currentBooking: booking,
      currentIndex: index
    });
  }

  render() {
    const { name, bookings, currentBooking, currentIndex } = this.state;

    return(
      <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
        <h3>My Bookings</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Bookings List</h2>
            <div className="list-group">
              {bookings && bookings.map((booking, index) => (
                <ListItem style={{}} selected={index === currentIndex} onClick={() => this.setActiveBooking(booking, index)} divider button style={{padding: "20px"}} key={index}> {booking.username} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentBooking ? (
              <div>
                <br/>
                <h2>Booking</h2>
                <div>
                  <label><strong>Date:</strong></label>{" "}{currentBooking.date}
                </div>
                <div>
                  <label><strong>Time:</strong></label>{" "}{currentBooking.time}
                </div>
                <div>
                  <label><strong>Name:</strong></label>{" "}{currentBooking.username}
                </div>
                <div>
                  <label><strong>Seats:</strong></label>{" "}{currentBooking.seats}
                </div>
                {/* <div>
                  <label><strong>Meals:</strong></label>{" "}{currentBooking.meals}
                </div> */}
                <div>
                  <label><strong>Status:</strong></label>{" "}{currentBooking.active ? "Active" : "Past"}
                </div>
                <br/>
                <Link style={{WebkitTextFillColor: "black"}} to={"/booking/my/" + currentBooking._id}>Edit</Link>
                <Switch>
                  <Route exact path={"/booking/my/" + currentBooking?._id} component={CustomerEditBooking}/>
                </Switch>
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px"}}>
                <br />
                <p><i>Please click on a Booking...</i></p>
              </div>
            )}
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewMyBookings