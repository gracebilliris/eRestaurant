import React from "react";
import Lasagna from '../media/lasagna.png';
import Burger from '../media/burger.png';
import Pizza from '../media/pizzas.png';

const DinnerMenu = () => {
    return (
        <body style={{marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman"}}>
            <div style={{textAlign: "center"}}>
                <h3>Dinner Menu</h3>
                <i>Please Note: the Dinner Menu will be offered between 3pm and 9pm.</i>
            </div>
            <card className="form-group">
                <div style={{marginLeft: 100}}>
                    <h5>Lasagna</h5>
                    <p><strong>Price: $20</strong></p>
                    <p>Ingredients: <i>onion, carrot, garlic, beef mince, tomatoes, butter, mozzarella and oregano</i></p>
                </div>
                <img style={{marginRight: 100}} class="center zoom img-fill" src={Lasagna} id="lasagna" width="350" height="150" alt=""/>
            </card>
            <card className="form-group">
                <div style={{marginLeft: 100}}>
                    <h5>Beef Burger</h5>
                    <p><strong>Price: $20</strong></p>
                    <p>Ingredients: <i>tomato, lettuce, red onion, beed, broiche bun and aioli sauce</i></p>
                </div>
                <img style={{marginRight: 100}} class="center zoom img-fill" src={Burger} id="burger" width="350" height="150" alt=""/>
            </card>
            <card className="form-group">
                <div style={{marginLeft: 100}}>
                    <h5>Pizza d'Andre</h5>
                    <p><strong>Price: $25</strong></p>
                    <p>Ingredients: <i>cherry tomatoes, olives, mushrooms, salami, bocconcini, mozzarella cheese and mint leaves</i></p>
                </div>
                <img style={{marginRight: 100}} class="center zoom img-fill" src={Pizza} id="pizza" width="350" height="150" alt=""/>
            </card>
        </body>
    );
};

export default DinnerMenu;