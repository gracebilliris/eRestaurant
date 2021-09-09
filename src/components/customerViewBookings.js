import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import EditBooking from "./customerEditBooking";

const viewBookings = () => {

  return (
    <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
        <h3 style={{color: "light grey"}}>My Bookings</h3>
        <br/>
        <h4 style={{textAlign: "center"}}><i>Active Booking</i></h4>
        <body style={{fontFamily: "Times New Roman"}}>
          <table>
            <tr>
              <th style={{textAlign: "center"}}>Date</th>
              <th style={{textAlign: "center"}}>Time</th>
              <th style={{textAlign: "center"}}>Seats</th>
              <th style={{textAlign: "center"}}>Meals</th>
              <th/>
            </tr>
            <tr>
              <td>08/05/21</td>
              <td>11:00am</td>
              <td>5</td>
              <td>Lunch</td>
              <td>
              <Link style={{display: "inline-block", WebkitTextFillColor: "black"}} to={"/mybookings/edit"}>Edit</Link>
              </td>
            </tr>
          </table>
        </body>
        <br/>
        <h4 style={{textAlign: "center"}}><i>Past Bookings</i></h4>
        <body style={{fontFamily: "Times New Roman"}}>
          <table>
            <tr>
              <th style={{textAlign: "center"}}>Date</th>
              <th style={{textAlign: "center"}}>Time</th>
              <th style={{textAlign: "center"}}>Seats</th>
              <th style={{textAlign: "center"}}>Meals</th>
            </tr>
            <tr>
              <td>08/05/21</td>
              <td>11:00am</td>
              <td>5</td>
              <td>Lunch</td>
            </tr>
            <tr>
              <td>16/07/21</td>
              <td>11:00am</td>
              <td>5</td>
              <td>Dinner</td>
            </tr>
            <tr>
              <td>08/07/22</td>
              <td>11:00am</td>
              <td>2</td>
              <td>Lunch</td>
            </tr>
          </table>
        </body>
      <Switch>
        <Route exact path={"/mybookings/edit"} component={EditBooking} />
      </Switch>
    </div>
  );
};

export default viewBookings;