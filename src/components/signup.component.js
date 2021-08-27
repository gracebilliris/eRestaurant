import React, { Component } from 'react';
import "../style.scss";

export default class Signup extends Component {
  render(){
    return (
      <form style={{marginTop: 10, maxWidth: '100%'}}>
      <div style={{textAlign: "center"}}>
            <h3 style={{color: "light grey"}}>Sign up</h3>
            <h4><i>Time to join the bistrot,</i></h4>
        </div>
        <div class="form">
          <label style={{display: "block", width: "50%", WebkitTextFillColor: "black"}}>
            <span style={{fontSize: "16px"}}>Name</span>
            <input className="form-control" type="text" />
          </label>
          <label style={{display: "block", width: "50%", WebkitTextFillColor: "black"}}>
            <span style={{fontSize: "16px"}}>Email</span>
            <input className="form-control" type="email" />
          </label>
          <label style={{display: "block", width: "50%", WebkitTextFillColor: "black"}}>
            <span style={{fontSize: "16px"}}>Password</span>
            <input className="form-control" type="password" />
          </label>
          <br/>
          <span style={{display: "inline-block"}}>Already have an account? Login <a href="/login">here</a></span>
          <button type="button" style={{display: "block", width: "30%"}} class="submit">Sign Up</button>
        </div>
      </form>
   );
  }
}