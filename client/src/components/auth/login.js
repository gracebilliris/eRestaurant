import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate style={{marginTop: 10, maxWidth: '100%'}} onSubmit={this.onSubmit}>
        <div style={{textAlign: "center"}}>
          <h3 style={{color: "light grey"}}>Login</h3>
          <h4><i>Welcome back,</i></h4>
        </div>
        <div className="form">
          <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className={classnames("", {invalid: errors.email || errors.emailnotfound})}/>
          <label htmlFor="email">Email</label>
          <span className="red-text form-control"> {errors.email}{errors.emailnotfound}</span>
        </div>
        <div className="form">
          <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames("", {invalid: errors.password || errors.passwordincorrect})}/>
          <label htmlFor="password">Password</label>
          <span className="red-text form-control"> {errors.password} {errors.passwordincorrect}</span>
        </div>
        <button style={{width: "150px", display: "block", width: "30%", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}} type="submit" className="submit">Login</button>
        </form>
      /*<form style={{marginTop: 10, maxWidth: '100%'}}>
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
         <span style={{display: "inline-block"}} class="password"><a href="/">Forgot password?</a></span>
         <br/>
         <span style={{display: "inline-block"}}>Don't have an account? Sign up <a href="/signup">here</a></span>
         <button type="button" style={{display: "block", width: "30%"}} class="submit">login</button>
       </div>
      </form>*/
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);