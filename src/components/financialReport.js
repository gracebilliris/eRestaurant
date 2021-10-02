import React from "react";
import { Grid, ListItem } from "@material-ui/core";
import ReportDataService from "../services/report-service";

class FinancialReport extends React.Component {
  constructor(props) {
    super(props);
    //Binding each attribute
    this.retrieveDates = this.retrieveDates.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDate = this.setActiveDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    //Define each attribute
    this.state = {
      dates: [],
      currentDate: null,
      currentIndex: -1,
      menus: [],
      totalcost: "",
      status: false
    };
  }

  componentDidMount() {
    this.retrieveDates();
  }

  onChangeStatus(e) {
   this.setState({
     status: e.target.value
   })
  }

  retrieveDates() {
    ReportDataService.getAll()
      .then(response => {
        this.setState({
          dates: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDates();
    this.setState({
      currentDate: null,
      currentIndex: -1
    });
  }

  setActiveDate(dates, index) {
    ReportDataService.get(dates)
    .then(response => {
      this.setState({
        currentDate: response.data,
        currentIndex: index
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  } 

  render() {
    const { dates, currentDate, currentIndex} = this.state;
    return (
      <div style={{fontFamily: "Times New Roman", textAlign: "center", "width":"80%", "marginLeft": "130px"}}>
        <hr className="new5"></hr>
        <h3>Financial Report</h3>
        <div>
          <label htmlFor="username">Select Location: </label>
          <select style={{ marginLeft: "5px" }}
            onChange={this.onChangeStatus}>
            <option selected value={false} />
            <option value={true}>North Sydney</option>
          </select>
        </div>
        {this.state.status ? (
          <div>
          <Grid container>
            <Grid item md={4}>
              <h2>Dates List</h2>
              <div className="list-group">
                {dates && dates.map((date, index) => (
                  <ListItem selected={index === currentIndex} onClick={() => this.setActiveDate(date, index)} divider button style={{padding: "20px"}} key={index}> {"Date: " + date} </ListItem>
                ))}
              </div>
            </Grid>
            <Grid item md={8}>
              {currentDate ? (
                <div className="beige-border">
                  <br/>
                  <h5>Menu Items:</h5>
                    <table>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDate.meals.map((meal, index) => (
                          <tr>
                            <td>{meal.name}</td>
                            <td>{meal.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  <br/>
                    <label><strong>Total Cost:</strong></label>{" $"}{currentDate.totalcost}
                </div>
               ) : (
                <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft:"100px"}}>
                </div>
              )}
            </Grid>
          </Grid>
          </div>
        ) : (<div>Please Pick Location</div>)}
        <hr className="new5"></hr>
      </div>
    );
  }
}

export default FinancialReport;
