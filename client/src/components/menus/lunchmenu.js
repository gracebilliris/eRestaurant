import React, { Component } from 'react';
import chickenCaesar from "../media/chicken-caesar.png";
import HoneyMustardTunaPotatoSalad from "../media/honey-mustard-tuna-and-sweet-potato-salad.png";

export default class LunchMenu extends Component {
    render() {
        return (
            <body style={{marginTop: 10, maxWidth: '100%'}}>
                <div style={{textAlign: "center"}}>
                    <h3>Lunch Menu</h3>
                    <i>Please Note: the Lunch Menu will be offered between 11am and 3pm.</i>
                </div>
                <card className="form-group">
                    <div>
                        <h5>Chicken Caesar Salad</h5>
                        <p><strong>Anything else to add?</strong></p>
                        <p>Ingredients: <i>boiled eggs, parmesan, caesar dressing, croutons, chicken breast and lettuce</i></p>
                    </div>
                    <img class="center zoom" src={chickenCaesar} id="chickenCaesar" alt=""/>
                </card>
                <card className="form-group">
                    <div>
                        <h5>Honey Mustard Tuna and Sweet Potato Salad</h5>
                        <p><strong>Anything else to add?</strong></p>
                        <p>Ingredients: <i>sweet potato, salad leaves, tuna, mustard and honey</i></p>
                    </div>
                    <img class="center zoom" src={HoneyMustardTunaPotatoSalad} id="HoneyMustardTunaPotatoSalad" alt=""/>
                </card>
            </body>
        )
    }
}