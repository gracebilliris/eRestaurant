import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { createbooking } from "../actions/createbooking";

const required = (value) => {
  if (!value) {
    return (
       <div className="alert alert-danger" role="alert">This field is required!</div>
    );
  }
};

// const vtime = (value) => {
//   if (value.)
// }

const EditBooking = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const form = useRef();
  const checkBtn = useRef();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [menuItems, setMenuItems] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  const onChangeTime = (e) => {
    const time = e.target.value;
    setTime(time);
  };

  const onChangeSeats = (e) => {
    const seats = e.target.value;
    setSeats(seats);
  };

  const onChangeMenuItems = (e) => {
    const menuItems = e.target.value;
    setMenuItems(menuItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(createbooking(currentUser.username, date, time, seats))
      .then(() => {
        setLoading(false);
        props.history.push("/mybookings");
        window.location.reload();
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
    }
  };

  return (
      <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form" onSubmit={handleSubmit} ref={form} method = "POST">
        <h3 style={{color: "light grey"}}>Edit Booking</h3>
        <div>
            <label htmlFor="username">Username</label>
            <Input type="text" className="form-control" name="username" value={currentUser.username} disabled validations={[required]}/>
        </div>
        <div>
            <label htmlFor="date">Date</label>
            <Input type="date" className="form-control" name="date" value={date} onChange={onChangeDate} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="time">Time</label>
            <Input type="time" className="form-control" name="time" value={time} onChange={onChangeTime} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="seats">Seats</label>
            <Input type="number" className="form-control" name="seats" value={seats} onChange={onChangeSeats} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="meals">Meals</label>
            <br/>
            <select name="meals" size="4" multiple value={menuItems} onChange={onChangeMenuItems} validations={[required]}>
              <option value="casearSalad">Casear Salad</option>
              <option value="lasagna">Lasagna</option>
            </select>
        </div>
        <div>
            <button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af"}} className="btn btn-primary btn-block" disabled={loading}>
            {loading && ( <span className="spinner-border spinner-border-sm"></span> )}
            <span>Update</span>
            </button>
        </div>

        {message && (
            <div style={{"width": "800px", "marginLeft": "475px"}} className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">{message}</div>
            </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
};

export default EditBooking;