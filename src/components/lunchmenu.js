import React from "react";
import chickenCaesar from "../media/chicken-caesar.png";
import HoneyMustardTunaPotatoSalad from "../media/honey-mustard-tuna-and-sweet-potato-salad.png";
import charcuterieBoard from "../media/restaurantcharcuterieboard.png";

const LunchMenu = () => {
    return (
        <body style={{marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman"}}>
            <div style={{textAlign: "center"}}>
                <h3>Lunch Menu</h3>
                <i>Please Note: the Lunch Menu will be offered between 11am and 3pm.</i>
            </div>
            <card className="form-group">
                <div style={{marginLeft: 100}}>
                    <h5>Chicken Caesar Salad</h5>
                    <p><strong>Price: $20</strong></p>
                    <p>Ingredients: <i>boiled eggs, parmesan, caesar dressing, croutons, chicken breast and lettuce</i></p>
                </div>
                <img style={{marginRight: 100}} class="center zoom img-fill" src={chickenCaesar} id="chickenCaesar" width="350" height="150" alt=""/>
            </card>
            <card className="form-group">
                <div style={{marginLeft: 100, width: "600px"}}>
                    <h5>Charcuterie Board</h5>
                    <p><strong>Price: $30</strong></p>
                    <p>Ingredients: <i>walnuts, gherkins, figs, grapes, pomengrate, olives, brie cheese, cheddar cheese, salami, prosciutto, ham and bread sticks</i></p>
                </div>
                <img style={{marginRight: 100}} class="center zoom img-fill" src={charcuterieBoard} id="restaurantcharcuterieboard" width="350" height="150" alt=""/>
            </card>
            <card className="form-group">
                <div style={{marginLeft: 100}}>
                    <h5>Honey Mustard Tuna and Sweet Potato Salad</h5>
                    <p><strong>Price: $20</strong></p>
                    <p>Ingredients: <i>sweet potato, salad leaves, tuna, mustard and honey</i></p>
                </div>
                <img style={{marginRight: 100}} class="center zoom img-fill" src={HoneyMustardTunaPotatoSalad} id="HoneyMustardTunaPotatoSalad" width="380" height="150" alt=""/>
            </card>
        </body>
    );
};

export default LunchMenu;