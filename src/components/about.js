import React from "react";
import Vibes from '../media/restaurantvibes.png'
import Pizza from '../media/pizza1.jpg'

const About = () => {

  return (
    <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
      <h3>About Us</h3>
      <br/>
      <p><i>Le Bistrot d'Andre</i> is a French Restaurant located in North Sydney.</p>
      <p>We serve a variety of favourite lunch and dinner dishes alongside fine wines.</p>
      <p>Our modern meals are complimented by our funky and vibrant interior followed by our 'family feel' friendly service that makes you feel at home.</p>
      <p>We are open from 11am to 9pm, Monday to Sunday!</p>
      <br/>
      <div style={{paddingLeft: "400px"}}>
        <div class="slider">
          <div class="slide" id="slide-1">
            <img src={Vibes} style={{width: "400px", height: "275px"}}/>
          </div>
          <div class="slide" id="slide-2">
            <h4 style={{WebkitTextFillColor: "#d3d3af"}}>PRICELESS TASTE</h4>
            <p><i>Our dishes combine the freshness of international cuisine and the richness of France and magical flavours.
            Combining classic cooking techniques and the highest quality ingredients, Le Bistrot d'Andre offers you access
            to a unique culinary journey. The chefs and the team at Le Bistrot d'Andre are proud and privileged to serve you.
            We sincerely hope you enjoy your dining experience with us.</i></p>
          </div>
          <div class="slide" id="slide-3">
            <img src={Pizza} style={{width: "400px", height: "275px"}}/>
          </div>
          <div class="slide" id="slide-4">
            <h4 style={{WebkitTextFillColor: "#d3d3af"}}>MAGIC ATOMSPHERE</h4>
            <p><i>More than just providing our diners with incredible food, we want to provide each one with an incredible dining experience. 
            Each detail of Le Bistrot d'Andre has been carefully planned out and designed to highlight the unique richness of France. 
            From room to room, we’ve hand-selected pieces to fully feature this breathtaking aesthetic. 
            Come into Le Bistrot d'Andre and marvel at its unique beauty for yourself.</i></p>
          </div>
        </div>
      </div>
      <a className="circle-button" href="#slide-1">1</a>
      <a className="circle-button" href="#slide-2">2</a>
      <a className="circle-button" href="#slide-3">3</a>
      <a className="circle-button" href="#slide-4">4</a>
    </div>
  );
};

export default About;