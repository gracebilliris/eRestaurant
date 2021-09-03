import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login";
import LunchMenu from "./components/lunchmenu";
import DinnerMenu from "./components/dinnermenu";
import Signup from "./components/signup";
import Home from "./components/home";
import Account from "./components/account";
import About from "./components/about";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import BoardUser from "./components/boardUser";
import BoardOwner from "./components/boardOwner";
import BoardManager from "./components/boardManager";
import BoardStaff from "./components/boardStaff";
import logo from "./media/miniimage.png"
import name from "./media/lebistrotdandre.png"

const App = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const [showOwnerBoard, setShowOwnerBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowManagerBoard(currentUser.roles.includes("ROLE_MANAGER"));
      setShowStaffBoard(currentUser.roles.includes("ROLE_STAFF"));
      setShowOwnerBoard(currentUser.roles.includes("ROLE_OWNER"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div className="container" style={{fontFamily: "Times New Roman"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="horizontal-style" style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
          <a class="navbar-brand" href="http://www.lebistrotdandre.fr/">
            <img src={logo} id="wineAndBaguette" width="50" alt=""/>
          </a>
          <Link to="/" className="navbar-brand">
              <img src={name} id="lebistrotdandre" width="350" alt=""/>
            </Link>
          <div className="navbar-nav mr-auto" style={{paddingLeft: "5vw"}}>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">Home</Link>
            </li>

            {showManagerBoard && ( 
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/manager"} className="nav-link">Manager Board</Link>
              </li>
            )}

            {showOwnerBoard && (
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/owner"} className="nav-link">Owner Board</Link>
              </li>
            )}

            {showStaffBoard && (
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/staff"} className="nav-link">Staff Board</Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/user"} className="nav-link">User</Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto navbar-spread-style">
              <li className="nav-item">
                <Link to={"/account"} className="nav-link">My Account</Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
              </li>
            </div>
            ) : (
          <div className="navbar-nav ml-auto navbar-spread-style">
            <div class="dropdown">
                <button class="dropbtn nav-link">Menu</button>
                <div class="dropdown-content">
                  <Link to={"/lunchmenu"}>Lunch</Link>
                  <Link to={"/dinnermenu"}>Dinner</Link>
                </div>
            </div>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">Sign Up</Link>
            </li>
          </div>
          )}
        </nav>

        <div className="container" style={{marginTop: 20}}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/lunchmenu" component={LunchMenu}/>
            <Route exact path="/dinnermenu" component={DinnerMenu}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/account" component={Account} />
            <Route path="/user" component={BoardUser} />
            <Route path="/staff" component={BoardStaff} />
            <Route path="/manager" component={BoardManager} />
            <Route path="/owner" component={BoardOwner} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;