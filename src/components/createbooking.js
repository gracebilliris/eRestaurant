import React, { Component } from 'react';

export default class CreateBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            booking_name: '',
            booking_date: '',
            booking_time: '',
            booking_seats: '',
            booking_finished: false
        }
        this.onChangeBookingName = this.onChangeBookingName.bind(this);
        this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
        this.onChangeBookingTime = this.onChangeBookingTime.bind(this);
        this.onChangeBookingSeats = this.onChangeBookingSeats.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeBookingName(e) {
        // want name to match account name --> make it prefilled?
        this.setState({
            booking_name: e.target.value
        });
    }

    onChangeBookingDate(e) {
        // min date: tomorrow (24hours)
        this.setState({
            booking_date: e.target.value
        });
    }

    onChangeBookingTime(e) {
        // between 12pm and 8pm ?
        this.setState({
            booking_time: e.target.value
        });
    }

    onChangeBookingSeats(e) {
        this.setState({
            booking_seats: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Booking Name: ${this.state.booking_name}`);
        console.log(`Booking Date: ${this.state.booking_date}`);
        console.log(`Booking Time: ${this.state.booking_time}`);
        console.log(`Booking Seats: ${this.state.booking_seats}`);
        
        this.setState({
            booking_name: '',
            booking_date: '',
            booking_time: '',
            booking_seats: '',
            booking_finished: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10, maxWidth: '100%'}}>
                <div style={{textAlign: "center"}}>
                    <h3 style={{color: "light grey"}}>Create Booking</h3>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label style={{WebkitTextFillColor: "black", margin: "auto"}} className="element">Name: </label>
                        <input type="text" className="form-control" placeholder="Your Account Name" style={{display: "block", textAlign: "left", WebkitTextFillColor: "black"}} value={this.state.booking_name} onChange={this.onChangeBookingName}/>
                    </div>
                    <div className="form-group">
                        <label style={{WebkitTextFillColor: "black", margin: "auto"}} className="element">Date: </label>
                        <input type="date" className="form-control" min="Today" max="2022-12-30" style={{display: "block", textAlign: "left", WebkitTextFillColor: "black"}} value={this.state.booking_date} onChange={this.onChangeBookingDate}/>
                    </div>
                    <div className="form-group">
                        <label style={{WebkitTextFillColor: "black", margin: "auto"}} className="element">Time: </label>
                        <input type="time" step="3600" className="form-control" style={{display: "block", textAlign: "left", WebkitTextFillColor: "black"}} value={this.state.booking_time} onChange={this.onChangeBookingTime}/>
                    </div>
                    <i>Please note booking times are only for for 1 hour</i>
                    <div className="form-group">
                        <label style={{WebkitTextFillColor: "black", margin: "auto"}} className="element">Seats: </label>
                        <input type="number" placeholder="1" id="seats" min="1" max="150" className="form-control" style={{display: "block", textAlign: "left", WebkitTextFillColor: "black"}} value={this.state.booking_seats} onChange={this.onChangeBookingSeats}/>
                    </div>
                        <input type="submit" value="Create Booking" className="submit" style={{width: "50%"}}/>
                </form>
            </div>
        )
    }
}