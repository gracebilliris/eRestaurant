import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { signup } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
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

const Signup = () => {
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
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <Form style={{marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman"}} onSubmit={handleSignup} ref={form}>
      <div style={{textAlign: "center"}}>
        <h3 style={{color: "light grey"}}>Sign up</h3>
        <h4><i>Time to join the bistrot,</i></h4>
      </div>
      <div>
          {!successful && (
            <div>
              <div>
                <label htmlFor="username">Username</label>
                <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required, vusername]} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required, vpassword]} />
              </div>
                <span style={{ display: "inline-block" }}>Already have an account? Login <a href="/login">here</a></span><div>
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
        )}
        {message && (
          <div className="form-group">
            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">{message}</div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </div>
    </Form>
  );
};

export default Signup;