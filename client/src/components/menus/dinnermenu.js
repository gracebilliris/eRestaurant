import React, { Component } from 'react';
import Lasagna from '../media/lasagna.png'

export default class DinnerMenu extends Component {
    render() {
        return (
            <body style={{marginTop: 10, maxWidth: '100%'}}>
                <div style={{textAlign: "center"}}>
                    <h3>Dinner Menu</h3>
                    <i>Please Note: the Dinner Menu will be offered between 3pm and 9pm.</i>
                </div>
                <card className="form-group">
                    <div>
                        <h5>Lasagna</h5>
                        <p><strong>Anything else to add?</strong></p>
                        <p>Ingredients: <i>onion, carrot, garlic, beef mince, tomatoes, butter, mozzarella and oregano</i></p>
                    </div>
                    <img class="center zoom" src={Lasagna} id="lasagna" alt=""/>
                </card>
                <card className="form-group">
                    <div>
                        <h5>**</h5>
                        <p><strong>Anything else to add?</strong></p>
                        <p>Ingredients: <i>**</i></p>
                    </div>
                    {/* <img class="center zoom" src={HoneyMustardTunaPotatoSalad} id="HoneyMustardTunaPotatoSalad" alt=""/> */}
                </card>
            </body>
        )
    }
}