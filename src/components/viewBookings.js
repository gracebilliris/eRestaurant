import React, { Component } from "react";
import BookingDataService from "../services/booking-service";
import { Grid, ListItem, Link} from "@material-ui/core";
import Reserved from '../media/reserved.jpg'
import jsPDF from "jspdf";

class BookingsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveBookings = this.retrieveBookings.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBooking = this.setActiveBooking.bind(this);

    this.state = {
      bookings: [],
      currentBooking: null,
      currentIndex: -1
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
      }
    );
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

  pdfGenerate = () => {
    var doc = new jsPDF('portrait', 'px', 'a4', false);
    doc.html(document.querySelector('#toPrint'), {
      callback: function(pdf) {
        pdf.save('Receipt.pdf');
      }
    })
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
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveBooking(booking, index)} divider button style={{padding: "20px"}} key={index}> {"Date: " + booking.date + " ; Time: " + booking.time + " ; Name: " + booking.username} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentBooking ? (
              <div className="beige-border" style={{ "marginLeft": "200px"}}>
                <br/>
                <div id="toPrint">
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
                        {currentBooking.meals.map((meal, index) => (
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
                </div>
                <div>
                  <label><strong>Status:</strong></label>{" "}{currentBooking.active}
                </div>
                <br/>
                <div>
                <Link style={{WebkitTextFillColor: "black"}} onClick={this.pdfGenerate}>Download Receipt</Link>
                </div>
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft:"100px", transform:"translateY(-30%)"}}>
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