import React, { Component } from "react";
import BookingDataService from "../services/booking-service";
import { Link, Switch, Route } from "react-router-dom";
import { Grid, ListItem } from "@material-ui/core";
import CustomerEditBooking from "../components/customerEditBooking";
import Reserved from '../media/reserved.jpg'

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
      status: false
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
      currentIndex: -1,
      status: false
    });
  }

  setActiveBooking(booking, index) {
    //If active is past or current dont display the edit button
    if (booking.active === "Past" || booking.active === "Current") {
      this.setState({
        currentBooking: booking,
        currentIndex: index,
        status: false
      });
    }
    else {
      this.setState({
        currentBooking: booking,
        currentIndex: index,
        status: true
      });
    }
  }

  render() {
    const { bookings, currentBooking, currentIndex, status } = this.state;
    return(
      <div style={{fontFamily: "Times New Roman", textAlign: "center", "width":"80%", "marginLeft": "130px"}}>
        <hr className="new5"></hr>
        <h3>My Bookings</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Bookings List</h2>
            <div className="list-group">
              {bookings && bookings.map((booking, index) => (
                <ListItem style={{padding: "20px"}} selected={index === currentIndex} onClick={() => this.setActiveBooking(booking, index)} divider button key={index}> {"Date: " + booking.date + " ; Time: " + booking.time} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentBooking ? (
              <div className="beige-border">
                <br />
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
                <div>
                  <label><strong>Code:</strong></label>{" "}{currentBooking.code}
                </div>
                <br />
                <div>
                  <h5>Order:</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBooking.meals.map((meal) => (
                        <tr>
                          <td>{meal.name}</td>
                          <td>{meal.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <label><strong>Total Cost:</strong></label>{" $"}{currentBooking.totalcost}
                </div>
                <div>
                  <label><strong>Status:</strong></label>{" "}{currentBooking.active}
                </div>
                <br/>
                <div>
                {status ? (
                  <div>
                  <Link style={{WebkitTextFillColor: "black"}} to={"/booking/my/" + currentBooking._id}>Edit</Link>
                  <Switch>
                    <Route exact path={"/booking/my/" + currentBooking?._id} component={CustomerEditBooking}/>
                  </Switch>
                  </div>
                ) : (<></>)}
                </div>
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "10px", paddingBottom: "75px", marginLeft:"100px"}}>
                <br />
                
                <p style={{marginLeft:"100px"}}><i>Please click on a Booking...</i></p>
                <div style={{float: "left", width: "100%"}}>
                <img src={Reserved} style={{verticalAlign: "center", paddingLeft: 100, width: "500px", height: "300px"}} id="vibes" alt=""/>
              </div>  
              </div>
              
            )}
            </Grid>
        </Grid>
        <br/> 
        <hr className="new5"></hr>
      </div>
      
    );
  }
}

export default ViewMyBookings