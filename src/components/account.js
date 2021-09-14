import Axios from 'axios'
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect } from 'react-router-dom';
import { updateUser } from "../actions/auth";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
       <div className="alert alert-danger" role="alert">This field is required!</div>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">The password must be between 6 and 40 characters.</div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">This is not a valid email.</div>
    );
  }
};

const Account = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [codes, setCodes]=useState([])
  
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCodes();
  }, [])
  
  useEffect(() => {
    console.log(codes)
  }, [codes])

  const fetchCodes = async() => {
    const response = await Axios('http://localhost:8080/api/account');
    setCodes(response.data)    
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    if (e !== currentUser.email){
      const email = e.target.value;
      setEmail(email);
    }
    else {
      const email = e.target.value;
      setEmail(email);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const username = currentUser.username
      dispatch(updateUser(username, email, password))
      .then(() => {
        setSuccessful(true);
        props.history.push("/account");
        window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
    }
  };

  return (
    <div className="navbar-spread-style">
      <div className="column">
        <br/>
        <br/>
        <div>
          <h3>Discount Codes</h3>
        </div>
        <br/>
        {codes && codes.map(code => {
          return (
            <div key={code.name} style={{ alignItems: 'center', margin: '20px 60px' }}>
              <i>{code.name}</i>
            </div>
            );
        })}
      </div>
      <Form className="column" style={{ textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman" }} className="form" onSubmit={handleUpdate} ref={form} method="POST">
        <h3 style={{ color: "light grey" }}><strong>{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}'s</strong> Account</h3>
        <div>
          <label htmlFor="username">Username</label>
          <Input type="text" className="form-control" name="username" value={currentUser.username} disabled validations={[required]} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input type="text" className="form-control" name="email" placeholder={currentUser.email} onChange={onChangeEmail} validations={[validEmail]} />
        </div>
        <div>
          <br />
          <button style={{ backgroundColor: "#d3d3af", borderColor: "#d3d3af" }} className="btn btn-primary btn-block" disabled={message}>
            {message && (<span className="spinner-border spinner-border-sm"></span>)}
            <span>Update</span>
          </button>
        </div>

        {message && (
          <div style={{ "width": "800px", "marginLeft": "475px" }} className="form-group">
            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Account;