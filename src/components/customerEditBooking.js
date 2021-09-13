import React, { Component } from "react";
import BookingDataService from "../services/booking-service";
import { Button, TextField } from "@material-ui/core"
import { Link, Switch, Route } from "react-router-dom";
import CustomerViewBooking from "../components/customerViewBookings";

class EditMyBookings extends Component {
  constructor(props) {
    super(props);
      this.onChangeTime = this.onChangeTime.bind(this);
      this.onChangeSeats = this.onChangeSeats.bind(this);
      // this.onChangeMeals = this.onChangeMeals.bind(this);
      this.getBooking = this.getBooking.bind(this);
      this.updateBooking = this.updateBooking.bind(this);
      this.deleteBooking = this.deleteBooking.bind(this);

      this.state = {
        currentBooking: {
            id: null,
            date: "",
            time: "",
            username: "",
            active: true
        },
        message: ""
      };
    }

    componentDidMount() {
        const URL = String(this.props.location.pathname);
        const bookingId = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
        this.getBooking(bookingId);
    }

    onChangeTime(e) {
        const time = e.target.value;
        this.setState(function (prevState) {
            return {
                currentBooking: {
                    ...prevState.currentBooking,
                    time: time
                }
            };
        });
    }

    onChangeSeats(e) {
        const seats = e.target.value;
        this.setState(function (prevState) {
            return {
                currentBooking: {
                    ...prevState.currentBooking,
                    seats: seats
                }
            };
        });
    }

    // onChangeMeals(e) {
    //     const meals = e.target.value;
    //     this.setState(function (prevState) {
    //         return {
    //             currentBooking: {
    //                 ...prevState.currentBooking,
    //                 meals: meals
    //             }
    //         };
    //     });
    // }

    getBooking(id) {
        BookingDataService.get(id)
        .then(response => {
            this.setState({
                currentBooking: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateBooking() {
        BookingDataService.update(
            // {id: this.state.currentBooking.id},
            this.state.currentBooking
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "The booking was updated successfully!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteBooking() {
        const bookingId = this.state.currentBooking._id;
        BookingDataService.delete(bookingId)
            .then(response => {
                this.props.history.push('/booking/my/' + this.state.currentBooking.username)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentBooking } = this.state;

        return (
            <div>
                {currentBooking ? (
                <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
                <hr className="new5"></hr>
                <h3>My Booking</h3>
                <form>
                    <div>
                        <label htmlFor="username">Booking Name</label>
                        <TextField type="text" className="form-control" name="username" value={currentBooking.username} disabled/>
                    </div>
                    <div>
                        <label htmlFor="text">Date</label>
                        <TextField type="text" className="form-control" name="date" value={currentBooking.date} disabled/>
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <TextField type="time" className="form-control" name="time" value={currentBooking.time} onChange={this.onChangeTime} required/>
                    </div>
                    <div>
                        <label htmlFor="seats">Seats</label>
                        <TextField type="number" className="form-control" name="seats" value={currentBooking.seats} onChange={this.onChangeSeats} required/>
                    </div>
                    
                    <div className="form-group" style ={{display: "inline-flex"}}>
                        {currentBooking.active ? (
                            <div>
                                <Button onClick={this.deleteBooking}> Delete</Button>
                                <Button type="submit" onClick={this.updateBooking}> Update </Button>
                            </div>
                        ) : (
                            <div style={{textAlign: "center" }}>
                                <label><strong>Status: </strong>Past</label>
                                <p><i>You cannot edit past bookings</i></p>
                            </div>
                        )}
                    </div>
                    <br/>
                    <div style={{display: 'inline-block'}}>
                        <Link style={{WebkitTextFillColor: "black"}} to={"/booking/my/" + currentBooking.username}>Go Back?</Link>
                        <Switch>
                            <Route exact path={"/booking/my/" + currentBooking.username} component={CustomerViewBooking}/>
                        </Switch>
                    </div>
                </form>
                <hr className="new5"></hr>
                <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Booking...</p>
                </div>
            )}
        </div>
        );
    }
}

export default EditMyBookings
