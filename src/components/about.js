import React from "react";
import slide4 from "../media/barvibes.png"
import slide3 from "../media/restaurantvibes.png"
import slide2 from "../media/logo2.png"
import slide1 from "../media/foodvibes.png"

const About = () => {

  return (
    <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
        <h3>About Us</h3>
        <br/>
        <p><i>Le Bistrot d'Andre</i> is a French Restaurant located in North Sydney.</p>
        <p>We serve a variety of favourite lunch and dinner dishes alongside fine wines.</p>
        <p>Our modern meals are complimented by our funky and vibrant interior followed by our 'family feel' friendly service that makes you feel at home.</p>
        <br/>
        <div class="fling-minislide form-group">
          <img src={slide4} alt="Slide 4"/>
          <img src={slide3} alt="Slide 3"/>
          <img src={slide2} alt="Slide 2"/>
          <img src={slide1} alt="Slide 1"/>
      </div>
    </div>
  );
};

export default About;