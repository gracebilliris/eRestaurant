import React, { Component } from "react";
import MealDataService from "../services/meal-service";
import { Grid, ListItem } from "@material-ui/core";
import chickenCaesar from "../media/chicken-caesar.png";
import HoneyMustardTunaPotatoSalad from "../media/honey-mustard-tuna-and-sweet-potato-salad.png";
import charcuterieBoard from "../media/restaurantcharcuterieboard.png";

class LunchMenu extends Component {
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

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        <hr className="new5" ></hr>
        <h3>Lunch Menu</h3>
        <i>Please Note: the Lunch Menu will be offered between 11am and 3pm.</i>
        <br/>
        <br/>
        <Grid container>
          <Grid item md={4}>
            <div className="list-group">
              {meals && meals.map((meal, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveMeal(meal, index)} divider button style={{ padding: "20px" }} key={index}> {meal.name} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentMeal ? (
              <div>
                <section style={{ "marginLeft": "45px", "height": "40vh" }}>
                  <div class="imgBx" style={{ float: "right", transform: "translateY(-10%)", width: "320px", "marginRight": "100px" }}>
                    {currentMeal.name === "Charcuterie Board" ? (
                      <><br /><img style={{ marginRight: 230 }} class="center zoom img-fill" src={charcuterieBoard} id="restaurantcharcuterieboard" width="350" height="150" alt="" /></>
                    ) : (<div></div>)}
                    {currentMeal.name === "Chicken Caesar Salad" ? (
                      <><br /><img style={{ marginRight: 230 }} class="center zoom img-fill" src={chickenCaesar} id="chickenCaesar" width="350" height="150" alt="" /></>
                    ) : (<div></div>)}
                    {currentMeal.name === "Honey Mustard Tuna and Sweet Potato Salad" ? (
                      <><br /><img style={{ marginRight: 230 }} class="center zoom img-fill" src={HoneyMustardTunaPotatoSalad} id="HoneyMustardTunaPotatoSalad" width="380" height="150" alt="" /></>
                    ) : (<div></div>)}
                  </div>
                  <div class="contentBx">
                    <div class="formBx" style={{ fontFamily: "Times New Roman", transform: "translateY(-25%)" }}>
                      <div>
                        <label><strong>Name:</strong></label>{" "}{currentMeal.name}
                      </div>
                      <div>
                        <label><strong>Price:</strong></label>{" "}{currentMeal.price}
                      </div>
                      <div>
                        <label><strong>Ingredients:</strong></label>{" "}{currentMeal.ingredients}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px" }}>
                <br/>
                <p><i>Please click on a Meal...</i></p>
              </div>
            )}
          </Grid>
        </Grid>
        <hr className="new5" ></hr>
      </div>
    );
  }
}

export default LunchMenu