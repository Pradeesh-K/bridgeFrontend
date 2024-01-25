import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePagePre.css";
import { Link} from "react-router-dom";

export default function HomePagePre() {
  return (
    <>
    <Navbar />
    <div className="HOME-PAGE-pre" >
      <div className="div-2">
          <img
            className="image"
            alt="Image"
            src="https://c.animaapp.com/3TI0M3d2/img/image-2.png"
          />
          

        <div className="overlap-2">
          <div className="group-3">
            <div className="text-wrapper-2">DONNERSBERGERBRÜCKE</div>
            <div className="text-wrapper-3">EXPLORE THE NEW BRIDGE</div>
            <p className="exciting-times-are">
              Exciting times are on the horizon for the picturesque city of
              Munich as a gleaming new structure promises to redefine the city
              skyline. The decision to bid farewell to the old bridge is met
              with a sense of nostalgia ; however, with progress comes the
              anticipation of something new and splendid. The forthcoming
              construction of the bridge not only signifies a necessary upgrade
              in infrastructure but also holds the promise of a brighter and
              more connected future for Munich. <br />
              <br />
              The city is extending an invitation to its citizens to actively
              participate in shaping the design of the new iconic structure by
              requesting residents to vote their opinion on design
              options.&nbsp;&nbsp;Your perspective as a resident is instrumental
              in shaping the future development of our town, and we believe that
              your input will contribute significantly to the decision-making
              process. A survey is also designed to address various aspects of
              the bridge project, including its potential impact on traffic
              flow, accessibility, environmental considerations, and overall
              community well-being. By participating, you are not only
              expressing your individual viewpoint but also actively engaging in
              the democratic process that underpins the decision-making within
              our community.
              <br />
              <br />
              So, Munich residents, it&#39;s time to seize the opportunity and
              contribute to the creation of a bridge that will not only stand as
              a symbol of progress but also embody the shared identity and
              aspirations of the vibrant city. Let your voices be heard, and
              let&#39;s together shape the future of Munich&#39;s skyline!
            </p>
          </div>
          <div className="group-4">
            <div className="div-wrapper">
              <div className="text-wrapper-4">YOUR OPINION MATTERS !</div>
            </div>
            <Link to={`/index`} style={{ textDecoration: "none" }}>
            <button className="button-6">
              <div className="text">VOTE</div>
            </button>
            </Link>
            <Link to={`/survey`} style={{ textDecoration: "none" }}>
            <button className="button-7">
              <div className="text-2">SURVEY</div>
            </button>
            </Link>
          </div>
        </div>
        <img
          className="line"
          alt="Line"
          src="https://c.animaapp.com/3TI0M3d2/img/line-1.svg"
        />
        <div className="group-5">
          <div className="group-6">
            <div className="text-wrapper-5">UPCOMING SERVICES FOR YOU</div>
            <div className="text-wrapper-6">Road Closures</div>
            <div className="text-wrapper-7">Construction Notices</div>
            <div className="text-wrapper-8">Sustainability</div>
          </div>
          <button className="button-8">
            <div className="text-3">Plan your route</div>
          </button>
          <button className="button-9">
            <div className="text-3">Stay Updated</div>
          </button>
          <button className="button-10">
            <div className="text-3">Stay Informed</div>
          </button>
        </div>
        
      </div>
      
    </div>
    <Footer/>
    </>
  );
}
