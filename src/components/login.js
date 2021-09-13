import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Vibes from '../media/barvibes.png'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/account");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form" onSubmit={handleLogin} ref={form}>
      {message && (
          <div style={{"width": "800px", "marginLeft": "474px"}} className="form-group">
          <div className="alert alert-danger" role="alert">{message}</div>
          </div>
      )}
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
      <body className="navbar-spread-style" style={{display: "flex"}}>
        
          <section>
            <div class="imgBx" style={{float: "right"}}>
              <img src={Vibes} style={{verticalAlign: "center", paddingRight: 20, opacity: "100%", width: "450px", height: "650px"}} id="vibes" alt=""/>
            </div>
            <div class="contentBx">
              <div class="formBx" style={{fontFamily: "Times New Roman", transform: "translateY(-3%)"}}>
                <h3>Login</h3>
                <h4><i>Welcome back,</i></h4>
                <div class="inputBx">
                  <label htmlFor="username">Username</label>
                  <Input style={{maxWidth: "120%"}} type="text" className="form-group" name="username" value={username} onChange={onChangeUsername} validations={[required]}/>
                </div>
                <div class="inputBx"> 
                  <label htmlFor="password">Password</label>
                  <Input type="password" className="form-group" name="password" value={password} onChange={onChangePassword} validations={[required]}/>
                </div>
                <span style={{display: "inline-block"}} class="password"><a style={{WebkitTextFillColor: "black"}} href="/login">Forgot password?</a></span>
                <br/>
                <br/>
                <div>
                  <button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af"}} className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
      </body>
    </Form>
  );
};

export default Login;