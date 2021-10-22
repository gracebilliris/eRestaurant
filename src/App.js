import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login";
import LunchMenu from "./components/lunchmenu";
import DinnerMenu from "./components/dinnermenu";
import CreateBooking from "./components/createbooking";
import CustomerViewBookings from "./components/customerViewBookings";
import CustomerEditBookings from "./components/customerEditBooking";
import FinancialReport from "./components/financialReport";
import DiscountCodes from "./components/discountCodes";
import EditDiscountCodes from "./components/editDiscountCodes";
import CreateDiscountCodes from "./components/createDiscountCodes";
import StaffDetails from  "./components/staffDetails";
import StaffEditDetails from "./components/staffEditDetails";
import ViewMenuItems from  "./components/viewMenuItems";
import EditMenuItems from  "./components/editMenuItems";
import ViewBookings from  "./components/viewBookings";
import Signup from "./components/signup";
import Home from "./components/home";
import Account from "./components/account";
import About from "./components/about";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import logo from "./media/miniimage.png";
import name from "./media/lebistrotdandre.png";

const App = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const [showOwnerBoard, setShowOwnerBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      // clear message when changing location
      dispatch(clearMessage()); 
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
    <HashRouter history={history} basename={process.env.PUBLIC_URL}>
      <div className="container" style={{fontFamily: "Times New Roman"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light horizontal-style" style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
          <a class="navbar-brand" href="http://www.lebistrotdandre.fr/">
            <img src={logo} id="wineAndBaguette" width="50" alt=""/>
          </a>
          <Link to="/" className="navbar-brand">
              <img src={name} id="lebistrotdandre" width="350" alt=""/>
            </Link>
          <div className="navbar-nav navbar-spread-style">
            <div className="navbar-nav mr-auto">
              <li className="nav-item" style={{paddingRight: "10px"}}>
                <Link to={"/home"} className="nav-link">Home</Link>
              </li>
              
              {showManagerBoard && ( // manager view
                <div className="navbar-spread-style">
                  <li className="nav-item">
                    <Link to={"/staffdetails"} className="nav-link">Staff Details</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/financialreport"} className="nav-link">Report</Link>
                  </li>  
                  <li className="nav-item">
                    <Link to={"/menuitems/view"} className="nav-link">Menu Items</Link>
                  </li>
                  <li className="nav-item" >
                    <Link to={"/codes"} className="nav-link">Codes</Link>
                  </li>
                </div>
              )}

              {showOwnerBoard && ( // owner view
                <div className="navbar-spread-style">
                  <li className="nav-item">
                    <Link to={"/financialreport"} className="nav-link">Report</Link>
                  </li>  
                  <li className="nav-item">
                    <Link to={"/menuitems/view"} className="nav-link">Menu Items</Link>
                  </li>
                </div>
              )}

              {showStaffBoard && ( // staff view
                <div className="navbar-spread-style">
                  <li className="nav-item">
                    <Link to={"/booking/view"} className="nav-link">View Bookings</Link>
                  </li>
                </div>
              )}

              {currentUser && ( // logged in customer view
                <div className="navbar-spread-style">
                  <li className="nav-item" style={{paddingRight: "15px"}}>
                    <Link to={"/booking/create/" + currentUser?.username} className="nav-link">Create Booking</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/booking/my/" + currentUser?.username} className="nav-link">My Bookings</Link>
                  </li>
                </div>
              )}
            </div>

            {currentUser ? ( // logged in additions
              <div className="navbar-spread-style">
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
                  <Link to={"/account"} className="nav-link">My Account</Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>Logout</a>
                </li>
              </div>
              ) : ( // public view
              <div className="navbar-spread-style">
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
                  <Link to={"/login"} aria-label="Login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">Sign Up</Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <div className="container" style={{marginTop: 20}}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/lunchmenu" component={LunchMenu}/>
            <Route exact path="/dinnermenu" component={DinnerMenu}/>
            <Route exact path="/about" component={About}/>
            <Route path={"/booking/create/" + currentUser?.username} component={CreateBooking} />
            <Route exact path={"/booking/my/" + currentUser?.username} component={CustomerViewBookings} />
            <Route path={"/booking/my/"} component={CustomerEditBookings} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/financialreport" component={FinancialReport} />
            <Route exact path="/codes" component={DiscountCodes} />
            <Route path={"/codes/"} component={EditDiscountCodes} />
            <Route exact path={"/codescreate"} component={CreateDiscountCodes} />
            <Route exact path="/menuitems/view" component={ViewMenuItems} />
            <Route path={"/menuitems/"} component={EditMenuItems} />
            <Route exact path="/booking/view" component={ViewBookings} />
            <Route exact path="/staffdetails" component={StaffDetails} />
            <Route path={"/staffdetails/"} component={StaffEditDetails} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
