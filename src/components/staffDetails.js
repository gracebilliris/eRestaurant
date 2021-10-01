import React, { Component } from "react";
import StaffDataService from "../services/staff-service";
import { Grid, ListItem } from "@material-ui/core";
import EditStaffDetails from "./staffEditDetails";
import { Link, Switch, Route } from "react-router-dom";
import profile from "../media/queen.png";

class StaffDetailsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveStaffList = this.retrieveStaffList.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStaff = this.setActiveStaff.bind(this);

    this.state = {
      stafflist: [],
      currentStaff: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveStaffList();
  }

  retrieveStaffList() {
    StaffDataService.getAllStaff()
      .then(response => {
        this.setState({
          stafflist: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStaff();
    this.setState({
      currentStaff: null,
      currentIndex: -1
    });
  }

  setActiveStaff(staff, index) {
    this.setState({
      currentStaff: staff,
      currentIndex: index
    });
  }

  render() {
    const { stafflist, currentStaff, currentIndex } = this.state;

    return(
      <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
        <hr className="new5"></hr>
        <h3>Staff Details</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Staff List</h2>
            <div className="list-group">
              {stafflist && stafflist.map((staff, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveStaff(staff, index)} divider button style={{padding: "20px"}} key={index}> {staff.username} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentStaff ? (
              <div>
                <section style={{"marginLeft": "20px", "height":"40vh"}}>
                  <div class="imgBx" style={{float: "right", width:"320px", "marginRight": "100px"}}>
                    <img src={profile} style={{verticalAlign: "center", paddingRight: 20, opacity: "100%"}} id="profile" height="350" alt=""/>
                  </div>
                  <div class="contentBx">
                    <div class="formBx" style={{fontFamily: "Times New Roman", transform: "translateY(-5%)"}}>
                    <br/>
                <h2>Staff</h2>
                <div>
                  <label><strong>Name:</strong></label>{" "}{currentStaff.username}
                </div>
                <div>
                  <label><strong>Role:</strong></label>{" Staff"}
                </div>
                <div>
                  <label><strong>Email:</strong></label>{" "}{currentStaff.email}
                </div>
                <br />
                <Link style={{WebkitTextFillColor: "black"}} to={"/staffdetails/" + currentStaff._id}>Edit</Link>
                <Switch>
                  <Route exact path={"/staffdetails/" + currentStaff?._id} component={EditStaffDetails}/>
                </Switch>
                    </div>
                  </div>
                </section>
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px"}}>
                <br />
                <p><i>Please click on a Staff Member...</i></p>
              </div>
            )}
          </Grid>
        </Grid>
        <hr className="new5"></hr>
      </div>
    );
  }
}

export default StaffDetailsList