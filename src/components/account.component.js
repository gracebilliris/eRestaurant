import React, { Component } from 'react';
import Login from './login.component';
import Signup from "./signup.component";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Account extends Component {
    render() {
        return (
            <div style={{marginTop: 10, maxWidth: '100%'}}>
                <h3>My Account</h3>
                <div>
                    <Router>
                        <div className="options">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </div>
                        <br/>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                    </Router>
                </div>
            </div>
        )
    }
}