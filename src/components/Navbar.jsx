/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./Navbar.css";
import { Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div className={`component`}>
      <img className="group" alt="Group" src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1706290691/DONNERSBERGERBR%C3%9CCKE_xrznjg.png" />
      <img className="vector" alt="Vector" src="https://c.animaapp.com/3TI0M3d2/img/vector-3.svg" />
      <Link to={`/`} style={{ textDecoration: "none" }}>
      <div className="HOME">Home</div>
      </Link>
      <div className="text-wrapper">|Deutsch|</div>
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
