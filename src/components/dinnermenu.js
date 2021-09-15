import React, { Component } from "react";
import MealDataService from "../services/meal-service";
import { Grid, ListItem } from "@material-ui/core";
import Lasagna from '../media/lasagna.png';
import Burger from '../media/burger.png';
import Pizza from '../media/pizzas.png';

class DinnerMenu extends Component {
  constructor(props) {
    super(props);
    this.retrieveMeals = this.retrieveMeals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeal = this.setActiveMeal.bind(this);

    this.state = {
      meals: [],
      currentMeal: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveMeals();
  }

  retrieveMeals() {
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

  refreshList() {
    this.retrieveMeals();
    this.setState({
      currentMeal: null,
      currentIndex: -1
    });
  }

  setActiveMeal(meal, index) {
    this.setState({
        currentMeal: meal,
        currentIndex: index
    });
  }

  render() {
    const { meals, currentMeal, currentIndex } = this.state;

    return(
      <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
      <h3>Dinner Menu</h3>
      <i>Please Note: the Dinner Menu will be offered between 3pm and 9pm.</i>
      <br/>
        <br/>
        <Grid container>
          <Grid item md={4}>
            <div className="list-group">
              {meals && meals.map((meal, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveMeal(meal, index)} divider button style={{padding: "20px"}} key={index}> {meal.name} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentMeal ? (
                <div>
                    <br/>
                    <br/>
                    <h4>{currentMeal.name}</h4>
                    <div>
                        <label><strong>Price: ${currentMeal.price}</strong></label>
                    </div>
                    <div>
                        <label style={{maxWidth: "600px"}}>Ingredients: <i>{" "}{currentMeal.ingredients}</i></label>
                    </div>
                    {currentMeal.name === "Lasagna" ? (
                        <><br /><img style={{marginRight: 230}} class="center zoom img-fill" src={Lasagna} id="lasagna" width="350" height="150" alt=""/></>
                        ):( <div></div>)}
                    {currentMeal.name === "Beef Burger" ? (
                         <><br /><img style={{marginRight: 230}} class="center zoom img-fill" src={Burger} id="burger" width="350" height="150" alt=""/></>
                        ):( <div></div>)}
                    {currentMeal.name === "Pizza d'Andre" ? (
                        <><br /><img style={{ marginRight: 230 }} class="center zoom img-fill" src={Pizza} id="pizza" width="350" height="150" alt="" /></>
                        ):( <div></div>)}
                </div>
            ): (
                <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px"}}>
                    <br />
                    <p><i>Please click on a Meal...</i></p>
                </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DinnerMenu