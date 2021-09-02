import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import About from "./components/about.component";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import LunchMenu from "./components/menus/lunchmenu";
import DinnerMenu from "./components/menus/dinnermenu";
import Home from "./components/layout/home";
import CreateBooking from "./components/createbooking.component";

import logo from "./components/media/miniimage.png";
import name from "./components/media/lebistrotdandre.png";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class eRestaurant extends React.Component {
  state = {
    windowHeight: undefined,
    windowWidth: undefined,
    data: null
  };
  
  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  // componentDidMount() {
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res.express }))
  //     .catch(err => console.log(err));
  //     this.handleResize();
  //     window.addEventListener('resize', this.handleResize)
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  // // fetching the GET route from the Express server which matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // };

  render() {
      return (
        <Provider store={store}>
        <Router>
          <div className="container" style={{fontFamily: "Times New Roman"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="horizontal-style" style={{marginTop: 10, boxShadow: "none"}}>
              <a class="navbar-brand" href="http://www.lebistrotdandre.fr/">
                <img src={logo} id="wineAndBaguette" width="50" alt=""/>
              </a>
              <Link to="/" className="navbar-brand">
                <img src={name} id="lebistrotdandre" width="350" alt=""/>
              </Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <div class="dropdown">
                      <button class="dropbtn nav-link">Menu</button>
                      <div class="dropdown-content">
                        <Link to="/lunchmenu">Lunch</Link>
                        <Link to="/dinnermenu">Dinner</Link>
                      </div>
                  </div>
                  <li className="navbar-item">
                    <Link to="/createbooking" className="nav-link">Create Booking</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/about" className="nav-link">About Us</Link>
                  </li>
                  <div class="dropdown">
                    <button class="dropbtn nav-link" style={{fontFamily: "Times New Roman"}}>My Account</button>
                    <div class="dropdown-content" style={{visibility: "visible"}}>
                      <Link to="/login">Login</Link>
                      <Link to="/signup">Signup</Link>
                    </div>
                  </div>
                </ul>
              </div>
            </nav>
            <br/>
            <Route path="/" exact component={Home} />
            <Route path="/dinnermenu" component={DinnerMenu} />
            <Route path="/lunchmenu" component={LunchMenu} />
            <Route path="/login" component={Login} />
            {/* <Route path="/signup" component={Signup} /> */}
            <Route path="/createbooking" exact component={CreateBooking} />
            <Route path="/about" exact component={About} />
          </div>
          <footer className="navbar-nav mr-auto navbar-light bg-light center-element" id="horizontal-style" style={{maxWidth: "68%", marginBottom: 30, WebkitTextFillColor: "black", textAlign: "center", fontFamily: "Times New Roman"}}>
            Group 1 Not French - SES 1A
          </footer>
        </Router>
      </Provider>
    );
  }
}
export default eRestaurant;