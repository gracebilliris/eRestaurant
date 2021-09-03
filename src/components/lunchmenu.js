import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import chickenCaesar from "../media/chicken-caesar.png";
import HoneyMustardTunaPotatoSalad from "../media/honey-mustard-tuna-and-sweet-potato-salad.png";

const LunchMenu = () => {
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
            {/* <h3>{content}</h3> */}
        </body>
    );
};

export default LunchMenu;