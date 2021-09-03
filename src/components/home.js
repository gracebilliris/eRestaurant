import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import vibes from "../media/restaurantvibes.png";

const Home = () => {
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
    <div style={{textAlign: "center", fontFamily: "Times New Roman"}}>
        <h3 style={{color: "light grey"}}><i>Welcome to Le Bistrot d'Andre!</i></h3>
        <img src={vibes} id="restaurantvibes" width="450" alt="" style={{float: "right"}}/>
        <br/>
        <br/>
        <p> very brief description TBC ... </p>
        <h3>{content}</h3>
        {/* <header className="jumbotron"></header> */}
    </div>
  );
};

export default Home;