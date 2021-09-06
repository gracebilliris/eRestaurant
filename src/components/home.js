import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import About from "./about"
import LunchMenu from "./lunchmenu";
import DinnerMenu from "./dinnermenu";
import vibes from "../media/restaurantvibes.png";
import charcuterieboard from "../media/restaurantcharcuterieboard.png";
import frenchfoodspread from "../media/foodspread.png";
import chickenCaesarSalad from "../media/chicken-caesar.png";
import HoneyMustardTunaPotatoSalad from "../media/honey-mustard-tuna-and-sweet-potato-salad.png";
import Lasagna from '../media/lasagna.png';
import Burger from '../media/burger.png';
import Pizza from '../media/pizzas.png';

const Home = () => {

  return (
    <div style={{textAlign: "center", fontFamily: "Times New Roman"}}>
        <img src={frenchfoodspread} id="frenchfoodspread" height="400px" width="90%" alt="" />
        <br/>
        <br/>
        <h3 style={{color: "light grey"}}><i><strong>Welcome to Le Bistrot d'Andre!</strong></i></h3>
        <br/>
        <h4>Lunch Specials</h4>
        <div className="navbar-spread-style">
          <div className="column">
            <p><i>Chicken Caesar Salad</i></p>
            <img className="img-fill" src={chickenCaesarSalad} id="chickencaesarsalad" width="250" height="165" alt=""/>
          </div>
          <div className="column">
            <p><i>Charcuterie Board</i></p>
            <img className="img-fill" src={charcuterieboard} id="restaurantcharcuterieboard" width="250" height="165" alt=""/>
          </div>
          <div className="column">
            <p><i>Honey Mustard Tuna and Sweet Potato Salad</i></p>
            <img className="img-fill" src={HoneyMustardTunaPotatoSalad} id="HoneyMustardTunaPotatoSalad" width="250" height="165" alt=""/>
          </div>
        </div>
        <br/>
        <br/>
        <p>Click <Link to={"/lunchmenu"}>here</Link> to see more options.</p>
        <br/>
        <br/>
        <h4>Dinner Specials</h4>
        <div className="navbar-spread-style">
          <div className="column">
            <p><i>Lasagna</i></p>
            <img className="img-fill" src={Lasagna} id="lasagna" width="250" height="165" alt=""/>
          </div>
          <div className="column">
            <p><i>Beef Burger</i></p>
            <img className="img-fill" src={Burger} id="burger" width="250" height="165" alt=""/>
          </div>
          <div className="column">
            <p><i>Pizza d'Andre</i></p>
            <img className="img-fill" src={Pizza} id="pizza" width="250" height="165" alt=""/>
          </div>
        </div>
        <br/>
        <br/>
        <p>Click <Link to={"/dinnermenu"}>here</Link> to see more options.</p>
        <div className="form-group navbar-spread-style">
          <div style={{paddingRight: 10}}>
            <h5>About Us</h5>
            <p><i>Located in North Sydney!</i></p>
            <p><i>Family friendly restaurant</i></p>
            <p>Learn more about us <Link to={"/about"}>here</Link></p>
          </div>
          <img src={vibes} id="restaurantvibes" width="300" alt="" style={{float: "right"}}/>
        </div>
        <Switch>
          <Route exact path={"/about"} component={About} />
          <Route exact path={"/lunchmenu"} component={LunchMenu} />
          <Route exact path={"/dinnermenu"} component={DinnerMenu} />
        </Switch>
    </div>
  );
};

export default Home;