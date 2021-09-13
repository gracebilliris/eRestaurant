import React, { Component } from "react";
import MealDataService from "../services/meal-service";
import { Grid, ListItem } from "@material-ui/core";
import EditMenuItems from "./editMenuItems";
import { Link, Switch, Route } from "react-router-dom";

class MealsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveMeals = this.retrieveMeals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeal = this.setActiveMeal.bind(this);

    this.state = {
      mealsList: [],
      currentMeal: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveMeals();
  }

  retrieveMeals() {
    MealDataService.getAllMeals()
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
    this.retrieveMeal();
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
        <h3>Menu Items</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Meals</h2>
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
                <h2>Meal</h2>
                <div>
                  <label><strong>Name:</strong></label>{" "}{currentMeal.name}
                </div>
                <div>
                  <label><strong>Price:</strong></label>{" "}{currentMeal.price}
                </div>
                <div>
                  <label><strong>Ingredients:</strong></label>{" "}{currentMeal.ingredients}
                </div>
                <br />
                <Link style={{WebkitTextFillColor: "black"}} to={"/menuitems/" + currentMeal._id}>Edit</Link>
                <Switch>
                  <Route exact path={"/menuitems/" + currentMeal?._id} component={EditMenuItems}/>
                </Switch>
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "75px", paddingBottom: "75px"}}>
                <br />
                <p><i>Please click on a meal...</i></p>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MealsList