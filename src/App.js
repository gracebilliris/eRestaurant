import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import About from "./components/about.component";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import LunchMenu from "./components/lunchmenu.component";
import DinnerMenu from "./components/dinnermenu.component";
import Home from "./components/home.component";
import CreateBooking from "./components/createbooking.component";

import logo from "./media/miniimage.png";
import name from "./media/lebistrotdandre.png";

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

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
      this.handleResize();
      window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  onClick() {
    //
  }

  render() {
      return (
      <Router>
        <div className="container" style={{fontFamily: "Times New Roman"}}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light" id="horizontal-style" style={{marginTop: 10}}>
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
                  <button class="dropbtn nav-link">My Account</button>
                  <div class="dropdown-content">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/dinnermenu" component={DinnerMenu} />
          <Route path="/lunchmenu" component={LunchMenu} />
          <Route path="/createbooking" exact component={CreateBooking} />
          <Route path="/about" exact component={About} />
        </div>
        <footer className="navbar-nav mr-auto navbar-light bg-light center-element" id="horizontal-style" style={{maxWidth: "68%", marginBottom: 30, WebkitTextFillColor: "black", textAlign: "center", fontFamily: "Times New Roman"}}>
          Group 1 Not French - SES 1A
        </footer>
      </Router>
    );
  }
}
export default eRestaurant;