// Design.js

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Videos.css";
import { Link } from "react-router-dom";

export default function Videos() {
  return (
    <>
      <Navbar />
      <div className="content d-flex flex-column align-items-center">
        <h1 className="title">Videos</h1>
        <br />
        {/* Embed the video directly */}

        <h1>New Bridge Walkthrough</h1>

        <video width="960" height="520" controls>
          <source
            src="https://res.cloudinary.com/dlj8wpkzr/video/upload/v1708354918/Fusion%20Lab%20Videos/video_8_i3ov3w.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <br />
        <br />

        <h1>New Bridge Construction Process</h1>

        <video width="960" height="520" controls>
          <source
            src="https://res.cloudinary.com/dlj8wpkzr/video/upload/v1708354951/Fusion%20Lab%20Videos/FusionLab_GroupB_ConsProcess2_t9bmqf.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="d-flex justify-content-center  mt-3 mb-5">
          <Link to={`/Design`} style={{ textDecoration: "none" }}>
            <button className="buttons mx-2">
              <div className="buttonText"> Gallery </div>
            </button>
          </Link>
          <Link to={`/Drawings`} style={{ textDecoration: "none" }}>
            <button className="buttons mx-2">
              <div className="buttonText">Drawings</div>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
