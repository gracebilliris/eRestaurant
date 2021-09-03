import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Lasagna from '../media/lasagna.png'

const DinnerMenu = () => {
    // eslint-disable-next-line 
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
        (response) => {
            setContent(response.data);
        },
        (error) => {
            const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

            setContent(_content);
        }
        );
    }, []);

    return (
        <body style={{marginTop: 10, maxWidth: '100%', fontFamily: "Times New Roman"}}>
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
                {/* <img class="center zoom" src={...} id="..." alt=""/> */}
            </card>
        </body>
    );
};

export default DinnerMenu;