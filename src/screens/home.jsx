import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/home.css";
import Navbar from "../components/Navbar";
import aiimage from "../assets/Union.svg";
import GradientText from "../components/GradientText";
import mic from "../assets/mic.svg"
import speaker from "../assets/volume.svg"

const Home = () => {
  
  const [yoe, setyoe] = useState(null)
  const [additional, setadditional] = useState(null)
  const [userjson, setuserjson] = useState({})
  const [friendliness, setFriendliness] = useState(0);
  const [technical, setTechnical] = useState(0);
  const [Professionalism, setProfessionalism] = useState(0);
  const [empathy, setEmpathy] = useState(0)
  const [jobrole, setjobrole] = useState("")

  var userJson  = {
    "jobrole": "",
    "yoe": 0,
    "interviewer-friendliness": "high",
    "interviewer-technical-aptitude": "medium",
    "interviewer-empathy": "medium",
    "interviewer-professionalism": "low"
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

  const TraitSelector = () => {
    
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <GradientText text="ENTER JOB INFORMATION"/>
          <div className="row-inputs">
            <div>
              <p className="one-text">Job Role</p>
              <input type="text" key="jobrole" className="input-small" onChange={val=>setjobrole(val.target.value)} value={jobrole}/>
            </div>
            <div>
              <p className="one-text">{"Required YOE (Years of Experience)"}</p>
              <input type="number" className="input-small"  onChange={val=>setyoe(val.target.value)} value={yoe}/>
            </div>
          </div>

          <div>
            <p className="one-text">{"Anything else? (Optional)"}</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="input-large"
            ></textarea>
          </div>
        </div>
        <button className="interview-button" onClick={() => {
          if(yoe!=null && yoe>-1 && jobrole.length>0){
            setUserStoryIndex(userStoryIndex + 1)
          }
          else{
            alert("Please fill the information correctly!")
          }
        }}>
          <p className="button-text">Next</p>
        </button>
      </div>
    );
  };

  const RoleSelector = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="trait-parent">
          <GradientText text="Toggle Interviewer's Traits"/>
          <br /><br />
         <div className="slider-row">
         <div className="single-slider">
            <p className="trait-name">Friendliness Level</p>
            <input key="friendliness" className="slider" type="range" min="1" max="100" value={friendliness} onChange={e=>setFriendliness(e.target.value)} class="slider" id="myRange"/>
            <p className="trait-desc">The degree to which the interviewer's tone and demeanor are friendly and welcoming.</p>
          </div>
          <div className="single-slider" >
            <p className="trait-name">Technical Proficiency</p>
            <input className="slider" type="range" min="1" max="100"  class="slider" id="myRange"/>
            <p className="trait-desc">The level of technical knowledge and expertise possessed by the interviewer. Options may include:</p>
          </div>
         </div>

         <div className="slider-row">
         <div className="single-slider">
            <p className="trait-name">Professionalism Rating</p>
            <input className="slider" type="range" min="1" max="100"  class="slider" id="myRange"/>
            <p className="trait-desc">The extent to which the interviewer adheres to professional standards and conducts the interview in a formal manner.</p>
          </div>
          <div className="single-slider">
            <p className="trait-name">Empathy Level</p>
            <input className="slider" type="range" min="1" max="100"  class="slider" id="myRange"/>
            <p className="trait-desc">The degree to which the interviewer demonstrates understanding and compassion towards the interviewee's experiences and challenges. Options may include:</p>
          </div>
         </div>


        </div>
        <button className="interview-button"  onClick={() => setUserStoryIndex(userStoryIndex + 1)}>
          <p className="button-text">Start Interview</p>
        </button>
      </div>
    );
  };

  const InterviewSpace = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="feedback-parent">
          <GradientText text="AI Interview - Your Interviewer is Amanda"/>
          <div className="actual-chat">

          </div>
        </div>
        <div className="chat-input-row">
          <input className="chat-input" type="text" placeholder="Enter text here or hold mic to speak"/>
          <img src={mic} alt="" />
          <img src={speaker} alt="" />
        </div>
      </div>
    );
  };

  const DownloadButton = (textOutput) => {
    const file = new Blob([textOutput], {type: 'text/plain'});

    return (
            <button className="interview-button" variant="outlined">
                <a download="sample.txt" target="_blank" rel="noreferrer" href={URL.createObjectURL(file)} style={{
                    textDecoration: "inherit",
                    color: "inherit",
                }}>  <p className="button-text">Save Feedback</p></a>
            </button>
    )
}

  const FeedbackSpace = () => {
    return (
      <div className="userStoryParent">
        <div></div>

        <div className="feedback-parent">
          <GradientText text="Interview Feedback"/>
          <div className="actual feedback">
            <p className="feedback-text">feedback is something feedback beenx cdxjsx cdks feedback is something feedback beenx cdxjsx cdks feedback is something feedback beenx cdxjsx cdks feedback is something feedback beenx cdxjsx cdks feedback is something feedback beenx cdxjsx cdks </p>
          </div>
        </div>
        <DownloadButton/>
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
