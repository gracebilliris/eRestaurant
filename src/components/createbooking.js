import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { createBooking } from "../actions/createbooking";

const required = (value) => {
  if (!value) {
    return (
       <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const createBooking = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [menuItems, setMenuItems] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(createbooking(username, date, time, seats, menuItems))
        .then(() => {
          props.history.push("/home"); // for now
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
      <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form" onSubmit={handleSubmit} ref={form}>
        <h3 style={{color: "light grey"}}>Create Booking</h3>
        <div>
            <label htmlFor="date">Date</label>
            <Input type="date" className="form-control" name="date" value={date} onChange={onChangeDate} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="time">Time</label>
            <Input type="time" className="form-control" name="date" value={date} onChange={onChangeTime} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="seats">Seats</label>
            <Input type="number" className="form-control" name="date" value={date} onChange={onChangeSeats} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="menuItems">Menu Items</label>
            <select name="meals" size="4" multiple value={menuItems} onChange={onChangeMenuItems} validations={[required]}>
              <option value="casearSalad">Casear Salad</option>
              <option value="lasagna">Lasagna</option>
            </select>
            {/* <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]}/> */}
        </div>
        <span style={{display: "inline-block"}} class="password"><a href="/login">Forgot password?</a></span>
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
              <div className="alert alert-danger" role="alert">{message}</div>
            </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
};

export default createbooking;