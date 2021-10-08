import React, { Component } from "react";
import MealDataService from "../services/meal-service";
import { Button, Input } from "@material-ui/core"
import { Link, Switch, Route } from "react-router-dom";
import ViewMenuItems from "../components/viewMenuItems";

class EditMyBookings extends Component {
    constructor(props) {
        super(props);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.getMeal = this.getMeal.bind(this);
        this.updateMeal = this.updateMeal.bind(this);

        this.state = {
            currentMeal: {
                id: null,
                name: "",
                price: null,
                ingredients: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        const URL = String(this.props.location.pathname);
        const mealId = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
        this.getMeal(mealId);
    }

    onChangePrice(e) {
        const price = e.target.value;
        this.setState(function (prevState) {
            return {
                currentMeal: {
                    ...prevState.currentMeal,
                    price: price
                }
            };
        });
    }

    onChangeIngredients(e) {
        const ingredients = e.target.value;
        this.setState(function (prevState) {
            return {
                currentMeal: {
                    ...prevState.currentMeal,
                    ingredients: ingredients
                }
            };
        });
    }

    getMeal(id) {
        MealDataService.getMeal(id)
            .then(response => {
                this.setState({
                    currentMeal: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateMeal() {
        MealDataService.updateMeal(
            this.state.currentMeal
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The meal was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentMeal } = this.state;

        return (
            <div>
                <hr className="new5" ></hr>
                {currentMeal ? (
                    <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
                        <h3>Meal</h3>
                        <form style={{ transform: "translateY(-10%)" }}>
                            <div>
                                <label htmlFor="username">Name</label>
                                <Input type="text" className="form-control" name="username" value={currentMeal.name} disabled />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <Input aria-label="price" role="textbox" type="number" className="form-control" name="price" value={currentMeal.price} onChange={this.onChangePrice} />
                            </div>
                            <div>
                                <label htmlFor="description">Ingredients</label>
                                <Input aria-label="ingredients" role="textbox" type="description" className="form-control" name="ingredients" value={currentMeal.ingredients} onChange={this.onChangeIngredients} required />
                            </div>

                            <div className="form-group" style={{ display: "inline-flex" }}>
                                <div>
                                    <Button type="submit" onClick={this.updateMeal}> Update </Button>
                                </div>
                            </div>
                            <br />
                            <div style={{ display: 'inline-block' }}>
                                <Link style={{ WebkitTextFillColor: "black" }} to={"/menuitems/view"}>Go Back?</Link>
                                <Switch>
                                    <Route exact path={"/menuitems/view"} component={ViewMenuItems} />
                                </Switch>
                            </div>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Meal...</p>
                    </div>
                )}
                <hr className="new5" ></hr>
            </div>
        );
    }
}

export default EditMyBookings
