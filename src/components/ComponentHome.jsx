/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Component = ({ className }) => {
  return (
    <div className={`component ${className}`}>
      <img className="group" alt="Group" src="https://c.animaapp.com/3TI0M3d2/img/group-3-1.png" />
      <img className="vector" alt="Vector" src="https://c.animaapp.com/3TI0M3d2/img/vector-3.svg" />
      <div className="HOME">Home</div>
      <div className="text-wrapper">|deutsch|</div>
      <div className="ABOUT">About</div>
      <div className="DESIGN">Design</div>
      <div className="m-ORE">More</div>
      <div className="overlap-group">
        <div className="div" />
        <img className="search" alt="Search" src="https://c.animaapp.com/3TI0M3d2/img/search-1@2x.png" />
      </div>
    </div>
  );
};
