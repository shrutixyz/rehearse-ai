import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/home.css";
import Navbar from "../components/Navbar";
import aiimage from "../assets/Union.svg";

const Home = () => {
  function callGeminiAPI() {
    axios
      .post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: "Give me python code to sort a list." }],
            },
          ],
        }
      )
      .then(function (response) {
        console.log(response.data);
      });
  }

  const TraitSelector = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <p>ENTER JOB INFORMATION</p>
          <div className="row-inputs">
            <div>
              <p>Job Role</p>
              <input type="text" className="input-small" />
            </div>
            <div>
              <p>{"Required YOE (Years of Experience)"}</p>
              <input type="text" className="input-small" />
            </div>
          </div>

          <div>
            <p>{"Anything else? (Optional)"}</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="input-large"
            ></textarea>
          </div>
        </div>
        <button onClick={() => setUserStoryIndex(userStoryIndex + 1)}>
          <p>Next</p>
        </button>
      </div>
    );
  };

  const RoleSelector = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <div>
            <p>xyz</p>
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
            <p>description</p>
          </div>
          <div>
            <p>xyz</p>
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
            <p>description</p>
          </div>
          <div>
            <p>xyz</p>
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
            <p>description</p>
          </div>
        </div>
        <button onClick={() => setUserStoryIndex(userStoryIndex + 1)}>
          <p>Start Interview</p>
        </button>
      </div>
    );
  };

  const InterviewSpace = () => {
    return (
      <div>
        <h1>InterviewSpace</h1>
        <button onClick={() => setUserStoryIndex(3)}>
          <p>Next</p>
        </button>
      </div>
    );
  };
  const FeedbackSpace = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <p>Feedback</p>
          <p>heheheh</p>
        </div>
        <button onClick={() => console.log("download smth")}>
          <p>Save Feedback</p>
        </button>
      </div>
    );
  };
  const FourOhFour = () => {
    return (
      <div>
        <h1>FourOhFour</h1>
      </div>
    );
  };

  const DynamicComponent = ({ index }) => {
    let componentToRender;

    switch (index) {
      case 0:
        componentToRender = <TraitSelector />;
        break;
      case 1:
        componentToRender = <RoleSelector />;
        break;
      case 2:
        componentToRender = <InterviewSpace />;
        break;
      case 3:
        componentToRender = <FeedbackSpace />;
        break;
      default:
        componentToRender = <FourOhFour />;
        break;
    }

    return <div>{componentToRender}</div>;
  };

  const [userStoryIndex, setUserStoryIndex] = useState(0);
  return (
    <main>
      <div className="main-container-home">
        <Navbar />
        {
          <div className="userStoryParent">
            <DynamicComponent index={userStoryIndex} />
          </div>
        }
        <img className="aiimage-home" src={aiimage} alt="" />
      </div>
    </main>
  );
};

export default Home;
