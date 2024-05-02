import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/home.css";
import Navbar from "../components/Navbar";
import aiimage from "../assets/Union.svg";
import GradientText from "../components/GradientText";
import mic from "../assets/mic.svg";
import speaker from "../assets/volume.svg";
import speakerOnImage from "../assets/volume.svg";
import speakerOffImage from "../assets/volume-x.svg";
import names from "../data/names";
import logo from "../assets/logo.svg";

const Home = () => {
  const [yoe, setyoe] = useState(null);
  const [additional, setadditional] = useState(null);
  const [user, setuserjson] = useState({});
  const [friendliness, setFriendliness] = useState(0);
  const [technical, setTechnical] = useState(0);
  const [Professionalism, setProfessionalism] = useState(0);
  const [empathy, setEmpathy] = useState(0);
  const [jobrole, setjobrole] = useState("");
  const [extras, setExtras] = useState("");
  const [chats, setChats] = useState(["hehe"]);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [micOn, setMicOn] = useState(false);

  const [text, setText] = useState("");
  const synth = window.speechSynthesis;

  var userJson = {
    jobrole: "",
    yoe: 0,
    "interviewer-friendliness": "high",
    "interviewer-technical-aptitude": "medium",
    "interviewer-empathy": "medium",
    "interviewer-professionalism": "low",
    extras: "",
    "interviewer-name": "xyz",
  };
  function initInterview() {
    let randomNumber = Math.floor(Math.random() * 1000);
    userJson["jobrole"] = jobrole;
    userJson["yoe"] = yoe;
    userJson["interviewer-empathy"] = document.getElementById("empathy").value;
    userJson["interviewer-friendliness"] =
      document.getElementById("friendliness").value;
    userJson["interviewer-professionalism"] =
      document.getElementById("professionalism").value;
    userJson["interviewer-technical-aptitude"] =
      document.getElementById("technical").value;
    userJson.extras = extras;
    userJson["interviewer-name"] = names[randomNumber];
    console.log(userJson);
    setuserjson(userJson);
    setChats([
      {
        sender: "interviewer",
        content: "Hi there, would you like to introduce yourself please?",
      },
    ]);
    setText("Hi there, would you like to introduce yourself please?");
    speak("Hi there, would you like to introduce yourself please?");
  }
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

  const RoleSelector = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <GradientText text="ENTER JOB INFORMATION" />
          <div className="row-inputs">
            <div>
              <p className="one-text">Job Role</p>
              <input
                type="text"
                key="jobrole"
                id="jobrole"
                className="input-small"
              />
            </div>
            <div>
              <p className="one-text">{"Required YOE (Years of Experience)"}</p>
              <input type="number" className="input-small" id="yoe" />
            </div>
          </div>

          <div>
            <p className="one-text">{"Anything else? (Optional)"}</p>
            <textarea
              name=""
              id="extras"
              cols="30"
              rows="10"
              className="input-large"
            ></textarea>
          </div>
        </div>
        <button
          className="interview-button"
          onClick={async () => {
            var delayInMilliseconds = 300;

            setTimeout(function () {
              if (
                document.getElementById("yoe").value != null &&
                document.getElementById("jobrole").value.length != ""
              ) {
                setyoe(document.getElementById("yoe").value);
                setjobrole(document.getElementById("jobrole").value);
                setExtras(document.getElementById("extras").value);
                setUserStoryIndex(userStoryIndex + 1);
              } else {
                alert("Please fill the information correctly!");
              }
            }, delayInMilliseconds);
          }}
        >
          <p className="button-text">Next</p>
        </button>
      </div>
    );
  };

  const TraitSelector = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <GradientText text="Toggle Interviewer's Traits" />
          <br />
          <br />
          <div className="slider-row">
            <div className="single-slider">
              <p className="trait-name">Friendliness Level</p>
              <input
                key="friendliness"
                id="friendliness"
                className="slider"
                type="range"
                min="1"
                max="100"
                class="slider"
              />
              <p className="trait-desc">
                The degree to which the interviewer's tone and demeanor are
                friendly and welcoming.
              </p>
            </div>
            <div className="single-slider">
              <p className="trait-name">Technical Proficiency</p>
              <input
                className="slider"
                id="technical"
                type="range"
                min="1"
                max="100"
                class="slider"
              />
              <p className="trait-desc">
                The level of technical knowledge and expertise possessed by the
                interviewer. Options may include:
              </p>
            </div>
          </div>

          <div className="slider-row">
            <div className="single-slider">
              <p className="trait-name">Professionalism Rating</p>
              <input
                className="slider"
                type="range"
                min="1"
                max="100"
                class="slider"
                id="professionalism"
              />
              <p className="trait-desc">
                The extent to which the interviewer adheres to professional
                standards and conducts the interview in a formal manner.
              </p>
            </div>
            <div className="single-slider">
              <p className="trait-name">Empathy Level</p>
              <input
                className="slider"
                type="range"
                min="1"
                max="100"
                class="slider"
                id="empathy"
              />
              <p className="trait-desc">
                The degree to which the interviewer demonstrates understanding
                and compassion towards the interviewee's experiences and
                challenges. Options may include:
              </p>
            </div>
          </div>
        </div>
        <button
          className="interview-button"
          onClick={() => {
            setUserStoryIndex(userStoryIndex + 1);
            initInterview();
          }}
        >
          <p className="button-text">Start Interview</p>
        </button>
      </div>
    );
  };

  const speak = (textToSpeak) => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    synth.speak(utterance);
    // if (synth && text) {
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   synth.speak(utterance);
    // }
  };

  const InterviewSpace = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="feedback-parent">
          <GradientText
            text={
              "AI Interview - Your Interviewer is " + user["interviewer-name"]
            }
          />
          <div className="actual-chat">
            {chats.map((chat) => (
              <div className="single-chat">
                <div className="circle">
                  <img src={logo} className="logo-in-chat" alt="" />
                </div>
                <div>
                  <p className="interviewer-name">{user["interviewer-name"]}</p>
                  <p className="single-chat-text">{chat["content"]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            placeholder="Enter text here or hold mic to speak"
          />
          <img src={mic} alt="" />
          {speakerOn ? (
            <img
              onClick={() => setSpeakerOn(!speakerOn)}
              src={speakerOnImage}
              alt=""
            />
          ) : (
            <img
              onClick={() => setSpeakerOn(!speakerOn)}
              src={speakerOffImage}
              alt=""
            />
          )}
        </div>
      </div>
    );
  };

  const DownloadButton = (textOutput) => {
    const file = new Blob([textOutput], { type: "text/plain" });

    return (
      <button className="interview-button" variant="outlined">
        <a
          download="sample.txt"
          target="_blank"
          rel="noreferrer"
          href={URL.createObjectURL(file)}
          style={{
            textDecoration: "inherit",
            color: "inherit",
          }}
        >
          {" "}
          <p className="button-text">Save Feedback</p>
        </a>
      </button>
    );
  };

  const FeedbackSpace = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="feedback-parent">
          <GradientText text="Interview Feedback" />
          <div className="actual feedback">
            <p className="feedback-text">
              feedback is something feedback beenx cdxjsx cdks feedback is
              something feedback beenx cdxjsx cdks feedback is something
              feedback beenx cdxjsx cdks feedback is something feedback beenx
              cdxjsx cdks feedback is something feedback beenx cdxjsx cdks{" "}
            </p>
          </div>
        </div>
        <DownloadButton />
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
        componentToRender = <RoleSelector />;
        break;
      case 1:
        componentToRender = <TraitSelector />;
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
