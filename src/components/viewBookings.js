import React, { Component } from "react";
import BookingDataService from "../services/booking-service";
import { Grid, ListItem } from "@material-ui/core";
import Reserved from '../media/reserved.jpg'

class BookingsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveBookings = this.retrieveBookings.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBooking = this.setActiveBooking.bind(this);

    this.state = {
      bookings: [],
      currentBooking: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveBookings();
  }

  retrieveBookings() {
    BookingDataService.getAll()
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
    const { bookings, currentBooking, currentIndex } = this.state;

    return(
      <div style={{fontFamily: "Times New Roman", textAlign: "center", "width":"80%", "marginLeft": "130px"}}>
        <hr className="new5"></hr>
        <h3>Customer Bookings</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Bookings List</h2>
            <div className="list-group">
              {bookings && bookings.map((booking, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveBooking(booking, index)} divider button style={{padding: "20px"}} key={index}> {booking.username} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentBooking ? (
              <div className="beige-border">
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
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft:"100px"}}>
                <br />
                <p style={{marginLeft:"100px"}}><i>Please click on a Booking...</i></p>
                <div style={{float: "left", width: "100%"}}>
                <img src={Reserved} style={{verticalAlign: "center", paddingLeft: 100, width: "500px", height: "300px"}} id="vibes" alt=""/>
              </div> 
              </div>
            )}
          </Grid>
        </Grid>
        <hr className="new5"></hr>
      </div>
    );
  }
}

export default BookingsList