/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={`component d-flex flex-column mt-4 mb-2`}>
      <div  className="top-row d-flex flex-row justify-content-end">
      <  div className="language">|Deutsch|</div>
          <div className="search-bar">
            <img
              className="search"
              alt="Search"
              src="https://c.animaapp.com/3TI0M3d2/img/search-1@2x.png"
            />
      </div>
      </div>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div className="icons mt-1 d-flex ">
          <img
            className="logo"
            alt="Vector"
            src="https://c.animaapp.com/3TI0M3d2/img/vector-3.svg"
          />
          <img
            className="name mt-2"
            alt="Group"
            src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1706290691/DONNERSBERGERBR%C3%9CCKE_xrznjg.png"
          />
        </div>

        <div className="menu d-flex justify-content-between  mt-2">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <div className="HOME">Home</div>
          </Link>
          <Link to={`/about`} style={{ textDecoration: "none" }}>
          <div className="ABOUT">About</div>
          </Link>
          <Link to={`/Statistics`} style={{ textDecoration: "none" }}>
          <div className="ABOUT">Stats</div>
          </Link>
          <Link to={`/Design`} style={{ textDecoration: "none" }}>
          <div className="ABOUT">Gallery</div>
          </Link>
          <Link to={`/bcf`} style={{ textDecoration: "none" }}>
          <div className="ABOUT">BCF</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
