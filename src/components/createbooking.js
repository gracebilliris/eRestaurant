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

const timeSlot = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20;00", "21:00"];

 const vtime = (value) => {
   var flag;
  for(let i = 0; i < timeSlot; i++) {
    if (timeSlot[i] === value.onChangeTime) {
      flag = true;
    }
  }

  if (!flag) {
    return (
      <div className="alert alert-danger" role="alert">Must pick a time between 11-9pm!</div>
    );
  }
 }

const CreateBooking = (props) => {
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
        props.history.push("/home"); // for now
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
        <h3 style={{color: "light grey"}}>Create Booking</h3>
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
            <Input type="time" className="form-control" name="time" value={time} onChange={onChangeTime} validations={[required, vtime]}/>
        </div>
        <div>
            <label htmlFor="seats">Seats</label>
            <Input type="number" className="form-control" name="seats" value={seats} onChange={onChangeSeats} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="menuItems">Menu Items</label>
            <select name="meals" size="4" multiple value={menuItems} onChange={onChangeMenuItems} validations={[required]}>
              <option value="casearSalad">Casear Salad</option>
              <option value="lasagna">Lasagna</option>
            </select>
        </div>
        <div>
            <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
                <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Submit</span>
            </button>
        </div>

        {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">{message}</div>
            </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
};

export default CreateBooking;