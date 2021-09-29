import React, { Component } from "react";
import StaffDataService from "../services/staff-service";
import { Button, TextField } from "@material-ui/core"
import { Link, Switch, Route } from "react-router-dom";
import staffDetails from "../components/staffDetails";

class EditStaffDetails extends Component {
  constructor(props) {
    super(props);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.getStaff = this.getStaff.bind(this);
      this.updateStaff = this.updateStaff.bind(this);

      this.state = {
        currentStaff: {
            id: null,
            username: "",
            role: "",
            email: ""
        },
        message: ""
      };
    }

    componentDidMount() {
        const URL = String(this.props.location.pathname);
        const staffId = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
        this.getStaff(staffId);
    }

    onChangeEmail(e) {
        const email = e.target.value;
        this.setState(function (prevState) {
            return {
                currentStaff: {
                    ...prevState.currentStaff,
                    email: email
                }
            };
        });
    }

    getStaff(staffId) {
        StaffDataService.getStaff(staffId)
        .then(response => {
            this.setState({
                currentStaff: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateStaff() {
        StaffDataService.updateStaff(
            this.state.currentStaff
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "Staff Details were updated successfully!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentStaff } = this.state;

        return (
            <div>
                <hr className="new5" ></hr>
                {currentStaff ? (
                <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
                <h3>Staff List</h3>
                <form style={{transform: "translateY(-10%)"}}>
                    <div>
                        <label htmlFor="username">Staff Name</label>
                        <TextField type="text" className="form-control" name="username" value={currentStaff.username} disabled/>
                    </div>
                    <div>
                        <label htmlFor="text">Role</label>
                        <TextField type="text" className="form-control" name="role" value={"Staff"} disabled/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <TextField type="email" className="form-control" name="email" value={currentStaff.email} onChange={this.onChangeEmail} required/>
                    </div>
                    
                    <div className="form-group" style ={{display: "inline-flex"}}>
                       <div>
                            <Button onClick={this.deleteStaff}> Delete</Button>
                        </div>
                    </div>
                    <br/>
                    <div style={{display: 'inline-block'}}>
                        <Link style={{WebkitTextFillColor: "black"}} to={"/staffdetails"}>Go Back?</Link>
                        <Switch>
                            <Route exact path={"/staffdetails"} component={staffDetails}/>
                        </Switch>
                    </div>
                </form>
                <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Staff...</p>
                </div>
            )}
            <hr className="new5" ></hr>
        </div>
        );
    }
}

export default EditStaffDetails
