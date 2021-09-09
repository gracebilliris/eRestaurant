import React from "react";

const viewBookings = () => {

  return (
    <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
        <h3>Bookings</h3>

        <h3 style={{textAlign: "left"}}>Customer Bookings</h3>
        <body>
          <table>
            <tr>
              <th style={{textAlign: "center"}}>Username</th>
              <th style={{textAlign: "center"}}>Date</th>
              <th style={{textAlign: "center"}}>Time</th>
              <th style={{textAlign: "center"}}># of People</th>
              <th style={{textAlign: "center"}}>Meal</th>
            </tr>
            <tr>
              <td>grace</td>
              <td>08/05/21</td>
              <td>11:00am</td>
              <td>5</td>
              <td>Lunch</td>
            </tr>
            <tr>
              <td>grace</td>  
              <td>16/07/21</td>
              <td>11:00am</td>
              <td>5</td>
              <td>Dinner</td>
            </tr>
            <tr>
              <td>jerome</td>
              <td>08/07/22</td>
              <td>11:00am</td>
              <td>2</td>
              <td>Lunch</td>
            </tr>
          </table>
        </body> 
    </div>
  );
};

export default viewBookings;