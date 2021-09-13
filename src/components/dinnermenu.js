import React, { Component } from "react";
import MealDataService from "../services/meal-service";
import Lasagna from '../media/lasagna.png';
import Burger from '../media/burger.png';
import Pizza from '../media/pizzas.png';

class DinnerMenu extends Component {
  constructor(props) {
    super(props);
    this.retrieveDinner = this.retrieveDinner.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  componentDidMount() {
    this.retrieveDinnerMeals();
  }

  retrieveDinnerMeals() {
    MealDataService.getAllDinnerMeals()
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
    const { dinnerList } = this.state;

    return(
        <body style={{ marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman" }}>
            <div style={{ textAlign: "center" }}>
                <h3>Dinner Menu</h3>
                <i>Please Note: the Dinner Menu will be offered between 3pm and 9pm.</i>
            </div>
            <card className="form-group">
                <div style={{ marginLeft: 100 }}>
                    <h5>{dinnerList[0].name}</h5>
                    <p><strong>{dinnerList[0].price}</strong></p>
                    <p>Ingredients: <i>{dinnerList[0].ingredients}</i></p>
                </div>
                <img style={{ marginRight: 100 }} class="center zoom img-fill" src={Lasagna} id="lasagna" width="350" height="150" alt="" />
            </card>
            <card className="form-group">
                <div style={{ marginLeft: 100, width: "600px" }}>
                    <h5>{dinnerList[1].name}</h5>
                    <p><strong>{dinnerList[1].price}</strong></p>
                    <p>Ingredients: <i>{dinnerList[1].ingredients}</i></p>
                </div>
                <img style={{ marginRight: 100 }} class="center zoom img-fill" src={Burger} id="burger" width="350" height="150" alt="" />
            </card>
            <card className="form-group">
                <div style={{ marginLeft: 100 }}>
                    <h5>{dinnerList[2].name}</h5>
                    <p><strong>{dinnerList[2].price}</strong></p>
                    <p>Ingredients: <i>{dinnerList[2].ingredients}</i></p>
                </div>
                <img style={{ marginRight: 100 }} class="center zoom img-fill" src={Pizza} id="pizza" width="350" height="150" alt="" />
            </card>
        </body>
    );
  }
}

export default DinnerMenu