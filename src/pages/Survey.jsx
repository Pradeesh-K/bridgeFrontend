import React from "react";
import { useState, useEffect } from "react";
// import { Component } from "../components/Component";
// import { Faq } from "../../components/Faq";
// import { InputLinearScale } from "../components/InputLinearScale";
// import { InputLinearScaleWrapper } from "../components/InputLinearScaleWrapper";
// // import { MakersMain } from "../../components/MakersMain";
// import { TextElements } from "../components/TextElements";
// import { TextElementsWrapper } from "../components/TextElementsWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Survey.css";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';


export default function Survey() {
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (question, value) => {
    setAnswers((prevAnswers) => {
      // Check if an answer for this question already exists in the array
      const existingAnswerIndex = prevAnswers.findIndex(
        (ans) => ans.question === question
      );

      if (existingAnswerIndex !== -1) {
        // If the question already has an answer, update the answer array
        if(value == 'Yes' || value == 'No') {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex] = {
            question,
            answer: [value],
          };
          return updatedAnswers;
        }
        else {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          question,
          answer: [...updatedAnswers[existingAnswerIndex].answer, value],
        };
        return updatedAnswers;
      }
      } else {
        // If the question does not have an answer, add a new answer to the array
        return [
          ...prevAnswers,
          {
            question,
            answer: [value],
          },
        ];
      }
    });
  };

  const isClicked = (question, value) => {
    return answers.some(
      (ans) => ans.question === question && ans.answer.includes(value)
    );
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    document.documentElement.scrollTop = 0;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert the answers array to JSON
    const answersJSON = JSON.stringify(answers);
    console.log(answersJSON);


    // Append the JSON data to the form data
    // formData.append("answers", answersJSON);

    // Make a fetch request or submit the form with the form data
    try {
      const response = await fetch(`${backendURL}/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: answersJSON
      });

      // Handle the response as needed
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
    setAnswers([]);

  
  };


  return (
    <div>
      <Navbar />
      <div className="survey">
        <div className="text-wrapper-8">SURVEY</div>

        <div className={`text-elements `}>
          <div className="frame">
            <p className="text-wrapper">
              Please fill out the following questions so that we may serve you
              better
            </p>
          </div>
          <div className="there-may-be-more-wrapper">
            <p className="there-may-be-more">
              There may be more than one answer to&nbsp;&nbsp;the question.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              Are you aware of the upcoming bridge reconstruction project in
              this area?
            </p>
          </div>

          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("aware", "Yes") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("aware", "Yes")}
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper ${isClicked("aware", "No") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("aware", "No")}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              Do you understand the scope and purpose of the project ?
            </p>
          </div>

          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("scope", "Yes") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("scope", "Yes")}
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper ${isClicked("scope", "No") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("scope", "No")}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              What are your preferred modes of transportation, and how do you
              typically travel through this area?
            </p>
          </div>
          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("transportation", "Bus") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("transportation", "Bus")}
                >
                  Bus
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper  ${isClicked("transportation", "U Bahn") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("transportation", "U Bahn")}
                >
                  U Bahn
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("transportation", "S Bahn") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("transportation", "S Bahn")}
                >
                  S Bahn
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("transportation", "Cycle") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("transportation", "Cycle")}
                >
                  Cycle
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("transportation", "Walk") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("transportation", "Walk")}
                >
                  Walk
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              What are your concerns during the construction period?
            </p>
          </div>
          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("concerns", "Safety") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("concerns", "Safety")}
                >
                  Safety
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper  ${isClicked("concerns", "Traffic") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("concerns", "Traffic")}
                >
                  Traffic
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("concerns", "Pollution") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("concerns", "Pollution")}
                >
                  Pollution
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              Are you concerned about the potential environmental impact of the
              bridge reconstruction?
            </p>
          </div>

          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("environmental", "Yes") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("environmental", "Yes")}
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper ${isClicked("environmental", "No") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("environmental", "No")}
                >
                  No
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              How would you prefer to receive information and updates about the
              project?
            </p>
          </div>
          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("updates", "Email") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("updates", "Email")}
                >
                  Email
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper  ${isClicked("updates", "News") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("updates", "News")}
                >
                  News
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              Which specific channels or platforms that you find most effective
              for communication?
            </p>
          </div>
          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("communication-channel", "Twitter") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("communication-channel", "Twitter")
                  }
                >
                  Twitter
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper  ${isClicked("communication-channel", "Facebook") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("communication-channel", "Facebook")
                  }
                >
                  Facebook
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("communication-channel", "Website") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("communication-channel", "Website")
                  }
                >
                  Website
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("communication-channel", "Youtube") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("communication-channel", "Youtube")
                  }
                >
                  Youtube
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper   ${isClicked("communication-channel", "Linkedin") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("communication-channel", "Linkedin")
                  }
                >
                  Linkedin
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              Are there any community events or gatherings that the project team
              should be aware of and consider during construction planning?
            </p>
          </div>

          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("events", "Yes") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("events", "Yes")}
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper ${isClicked("events", "No") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("events", "No")}
                >
                  No
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              What feedback mechanisms would you find most convenient for
              expressing concerns?
            </p>
          </div>
          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper  ${isClicked("feedback-mechanism", "Website") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-2">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("feedback-mechanism", "Website")
                  }
                >
                  Website
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper  ${isClicked("feedback-mechanism", "Phone") ? "clicked" : ""
                }`}
            >
              <div className="text-wrapper-2">
                <button
                  type="button"
                  onClick={() =>
                    handleOptionClick("feedback-mechanism", "Phone")
                  }
                >
                  Phone
                </button>
              </div>
            </div>
          </div>
          <div className={`text-elements-wrapper `}>
            <p className={`are-you-aware-of-the `}>
              Have you voted for your preferred design?
            </p>
          </div>
          <div className={`input-linear-scale-wrapper `}>
            <div
              className={`div-wrapper ${isClicked("voted", "Yes") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("voted", "Yes")}
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              className={`div-wrapper ${isClicked("voted", "No") ? "clicked" : ""}`}
            >
              <div className="text-wrapper-3">
                <button
                  type="button"
                  onClick={() => handleOptionClick("voted", "No")}
                >
                  No
                </button>
              </div>
            </div>
          </div>
          <button className="button-6">
            <div className="text">SUBMIT</div>
          </button>
        </form>
        <p className="THANK-YOU-FOR-YOUR">
          <span className="span">&nbsp;</span>
          <span className="text-wrapper-9">
            THANK YOU FOR YOUR PARTICIPATION
          </span>
        </p>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
