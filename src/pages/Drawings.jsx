import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Drawings.css";
import { Link } from "react-router-dom";

export default function Drawings() {
  return (
    <>
      <Navbar />
      <div className="content d-flex flex-column">
        <h1 className="title">Bridge Technical Drawings</h1>
        <br></br>
        <h2>Finite Element Model (Structural Analyses)</h2>
        <img
          className="consnotices"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708356511/Fusion%20Lab%20website%20Images/Str_analysis_11_deuiwz.png"
          alt=""
        />
        <br />
        <div>
          <h2>Phasing/Demolition - Site facilities plan</h2>
          <img
            className="phasingplan img-fluid"
            src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708356511/Fusion%20Lab%20website%20Images/Phasing_demolition_jhmkl1.png"
            alt=""
          />
          <br />
           <h2>Plan</h2>
          <img
            className="phasingplan img-fluid"
            src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708379568/Fusion%20Lab%20website%20Images/plan_bggypp.jpg"
            alt=""
          />
          <br />
          <h2>Section Drawing</h2>
          <img
            className="phasingplan img-fluid"
            src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708378435/Fusion%20Lab%20website%20Images/Screenshot_2024-02-19_222613_ymzd1z.png"
            alt=""
          />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="d-flex justify-content-center  mt-3 mb-5">
          <Link to={`/Videos`} style={{ textDecoration: "none" }}>
            <button className="buttons mx-2">
              <div className="buttonText"> Videos </div>
            </button>
          </Link>
          <Link to={`/Design`} style={{ textDecoration: "none" }}>
            <button className="buttons mx-2">
              <div className="buttonText"> Gallery </div>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
