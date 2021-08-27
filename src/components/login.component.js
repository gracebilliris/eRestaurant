import React, { Component } from 'react';
import "../style.scss";

export default class Login extends Component {

  render(){
    return (
      <form style={{marginTop: 10, maxWidth: '100%'}}>
        <div style={{textAlign: "center"}}>
          <h3 style={{color: "light grey"}}>Login</h3>
          <h4><i>Welcome back,</i></h4>
        </div>
        <div class="form">
         <label style={{display: "block", width: "50%", WebkitTextFillColor: "black"}}>
           <span style={{fontSize: "16px"}}>Email</span>
           <input className="form-control" type="email" required autoComplete="off"/>
         </label>
         <label style={{display: "block", width: "50%", WebkitTextFillColor: "black"}}>
           <span style={{fontSize: "16px"}}>Password</span>
           <input className="form-control" type="password" required autoComplete="off"/>
         </label>
         <span style={{display: "inline-block"}} class="password"><a href="#">Forgot password?</a></span>
         <br/>
         <span style={{display: "inline-block"}}>Don't have an account? Sign up <a href="/signup">here</a></span>
         <button type="button" style={{display: "block", width: "30%"}} class="submit">login</button>
       </div>
     </form>
    );
  }
}