import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Constnotices.css";

export default function Constnotices() {
  return (
    <>
      <Navbar />
      <div className="content d-flex flex-column">
        <h1 className="title">Construction Notices</h1>
    <br></br>
    
      <img className="consnotices" src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708288271/Fusion%20Lab%20website%20Images/CONSTRUCTION-_PAGE_4-cropped_half_top_opumuw.png" alt="" />
      <h1 className="title">Phasing Plan</h1>
      <div >
      <img className="phasingplan img-fluid" src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708288356/Fusion%20Lab%20website%20Images/CONSTRUCTION-_PAGE_4-cropped_half_down_l4f5cj.png" alt="" />
      </div>
    
      </div>
      <Footer />
  </>
);
}