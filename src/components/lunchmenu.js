import React, { Component } from "react";
import MealDataService from "../services/meal-service";
import chickenCaesar from "../media/chicken-caesar.png";
import HoneyMustardTunaPotatoSalad from "../media/honey-mustard-tuna-and-sweet-potato-salad.png";
import charcuterieBoard from "../media/restaurantcharcuterieboard.png";

class LunchMenu extends Component {
  constructor(props) {
    super(props);
    this.retrieveLunch = this.retrieveLunch.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  componentDidMount() {
    this.retrieveLunchMeals();
  }

  retrieveLunchMeals() {
    MealDataService.getAllLunchMeals()
      .then(response => {
        this.setState({
          meals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { lunchList } = this.state;

    return(
    <body style={{marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman"}}>
        <div style={{textAlign: "center"}}>
            <h3>Lunch Menu</h3>
            <i>Please Note: the Lunch Menu will be offered between 11am and 3pm.</i>
        </div>
        <card className="form-group">
            <div style={{marginLeft: 100}}>
                <h5>{lunchList[0].name}</h5>
                <p><strong>{lunchList[0].price}</strong></p>
                <p>Ingredients: <i>{lunchList[0].ingredients}</i></p>
            </div>
            <img style={{marginRight: 100}} class="center zoom img-fill" src={chickenCaesar} id="chickenCaesar" width="350" height="150" alt=""/>
        </card>
        <card className="form-group">
            <div style={{marginLeft: 100, width: "600px"}}>
                <h5>{lunchList[1].name}</h5>
                <p><strong>{lunchList[1].price}</strong></p>
                <p>Ingredients: <i>{lunchList[1].ingredients}</i></p></div>
            <img style={{marginRight: 100}} class="center zoom img-fill" src={charcuterieBoard} id="restaurantcharcuterieboard" width="350" height="150" alt=""/>
        </card>
        <card className="form-group">
            <div style={{marginLeft: 100}}>
                <h5>{lunchList[2].name}</h5>
                <p><strong>{lunchList[2].price}</strong></p>
                <p>Ingredients: <i>{lunchList[2].ingredients}</i></p>
            </div>
            <img style={{marginRight: 100}} class="center zoom img-fill" src={HoneyMustardTunaPotatoSalad} id="HoneyMustardTunaPotatoSalad" width="380" height="150" alt=""/>
        </card>
    </body>
    );
  }
}

export default LunchMenu