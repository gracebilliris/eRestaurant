import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const About = () => {
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
    <div style={{fontFamily: "Times New Roman"}}>
        <div>
            <p>This will be the About page</p>
            <p>{content}</p>
        </div>
    </div>
  );
};

export default About;