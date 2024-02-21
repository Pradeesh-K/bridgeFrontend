import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./FAQ.css";
import { Link } from "react-router-dom";

export default function FAQ() {
  return (
    <>
      <Navbar />
      <div className="content d-flex flex-column">
        <br></br>

        <img
          className="consnotices"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708379608/Fusion%20Lab%20website%20Images/Property_1_1_ga4ggm.png"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}
