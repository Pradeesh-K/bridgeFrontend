import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePagePre.css";
import { Link } from "react-router-dom";

export default function HomePagePre() {
  return (
    <>
      <Navbar />
    
      <div className="HOME-PAGE-pre d-flex flex-column">
        <div className="group1 d-flex flex-column align-items-center mt-5">
          <img
            className="mainImage"
            alt="Image"
            src="https://c.animaapp.com/3TI0M3d2/img/image-2.png"
          />
          <div className="heading1 text-center mt-5 mb-4">
            DONNERSBERGERBRÜCKE
          </div>
          <div className="heading2 text-center mb-3">
            EXPLORE THE NEW BRIDGE
          </div>
          <p className="mainPara">
            Exciting times are on the horizon for the picturesque city of Munich
            as a gleaming new structure promises to redefine the city skyline.
            The decision to bid farewell to the old bridge is met with a sense
            of nostalgia ; however, with progress comes the anticipation of
            something new and splendid. The forthcoming construction of the
            bridge not only signifies a necessary upgrade in infrastructure but
            also holds the promise of a brighter and more connected future for
            Munich. <br />
            <br />
            The city is extending an invitation to its citizens to actively
            participate in shaping the design of the new iconic structure by
            requesting residents to vote their opinion on design
            options.&nbsp;&nbsp;Your perspective as a resident is instrumental
            in shaping the future development of our town, and we believe that
            your input will contribute significantly to the decision-making
            process. A survey is also designed to address various aspects of the
            bridge project, including its potential impact on traffic flow,
            accessibility, environmental considerations, and overall community
            well-being. By participating, you are not only expressing your
            individual viewpoint but also actively engaging in the democratic
            process that underpins the decision-making within our community.
            <br />
            <br />
            So, Munich residents, it&#39;s time to seize the opportunity and
            contribute to the creation of a bridge that will not only stand as a
            symbol of progress but also embody the shared identity and
            aspirations of the vibrant city. Let your voices be heard, and
            let&#39;s together shape the future of Munich&#39;s skyline!
          </p>
        </div>
        <div className="group2   mt-5 ">
          <div className="group2-subHeading text-center">
            YOUR OPINION MATTERS !
          </div>
          <div className="d-flex justify-content-center  mt-3 mb-5">
            <Link to={`/index`} style={{ textDecoration: "none" }}>
              <button className="buttons mx-3">
                <div className="buttonText">VOTE</div>
              </button>
            </Link>
            <Link to={`/survey`} style={{ textDecoration: "none" }}>
              <button className="buttons mx-3">
                <div className="buttonText">SURVEY</div>
              </button>
            </Link>
          </div>
        </div>
        <img
          className="line"
          alt="Line"
          src="https://c.animaapp.com/3TI0M3d2/img/line-1.svg"
        />
        <div className="group3 mb-5">
          <div className="text-wrapper-5 text-center">
            UPCOMING SERVICES FOR YOU
          </div>
          <div className="d-flex justify-content-between mt-3">
          <Link to={`/Roadclosures`} style={{ textDecoration: "none" }}>
              <button className="buttonsSmall">
                <div className="buttonTextSmall">Road Closures</div>
              </button>
            </Link>

            <Link to={`/Constnotices`} style={{ textDecoration: "none" }}>
              <button className="buttonsSmall">
                <div className="buttonTextSmall">Construction Notices</div>
              </button>
            </Link>
            
            <Link to={`/sust`} style={{ textDecoration: "none" }}>
              <button className="buttonsSmall">
                <div className="buttonTextSmall">Sustainability</div>
              </button>
            </Link>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}
