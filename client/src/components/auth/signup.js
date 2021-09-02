import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../../actions/authActions";
// import classnames from "classnames";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    // eslint-disable-next-line
    const { errors } = this.state;
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

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withRouter(Signup));