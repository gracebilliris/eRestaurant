import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { signup } from "../actions/auth";
import Vibes from '../media/restaurantvibes.png'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">This field is required!</div>
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

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">The username must be between 3 and 20 characters.</div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">The password must be between 6 and 40 characters.</div>
    );
  }
};

const Signup = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signup(username, email, password))
      .then(() => {
        props.history.push("/login");
        window.location.reload();
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    }
  };

  return (
    
    <Form style={{marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman"}} onSubmit={handleSignup} ref={form}>
        {!successful && ( 
          <div>
            <section>
              <div class="imgBx" style={{float: "left"}}>
                <img src={Vibes} style={{verticalAlign: "center", paddingLeft: 100, width: "500px", height: "650px"}} id="vibes" alt=""/>
              </div>
              <div class="contentBx">
                <div class="formBx" style={{fontFamily: "Times New Roman", transform: "translateY(-35%)"}}>
                  <h3>Sign up</h3>
                  <h4><i>Time to join the bistrot,</i></h4>
                  <div class="inputBx">
                    <label  htmlFor="username">Username</label>
                    <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required, vusername]} />
                  </div>
                  <div class="inputBx"> 
                    <label htmlFor="email">Email</label>
                    <Input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
                  </div>
                  <div class="inputBx">
                    <label htmlFor="password">Password</label>
                    <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required, vpassword]} />
                  </div>
                  <br/>
                  <span style={{ display: "inline-block" }}>Already have an account? Login <a style={{WebkitTextFillColor: "black"}} href="/login">here</a></span>
                  <br/>
                  <br/>
                  <button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af"}} className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            </section>
          </div> 
        )}
        {message && (
          <div style={{"width": "800px", "marginLeft": "474px"}} className="form-group">
            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">{message}</div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
};

export default Signup;