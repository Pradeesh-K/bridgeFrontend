import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Design.css";
import { Link } from "react-router-dom";

export default function Design() {
  return (
    <>
      <Navbar />
      <div className="content d-flex flex-column align-items-center">
        <h1 className="title">Design Gallery</h1>

        <div className="d-flex justify-content-center  mt-3 mb-5">
          <Link to={`/Videos`} style={{ textDecoration: "none" }}>
            <button className="buttons mx-2">
              <div className="buttonText"> Videos </div>
            </button>
          </Link>
          <Link to={`/Drawings`} style={{ textDecoration: "none" }}>
            <button className="buttons mx-2">
              <div className="buttonText"> Drawings </div>
            </button>
          </Link>
        </div>
        <img
          className="imge img-fluid"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708291189/Fusion%20Lab%20website%20Images/r2_f58vjl.png"
          alt=""
        />

        <div>
          <br />
          <img
            className="imge img-fluid"
            src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708420538/Fusion%20Lab%20website%20Images/Picture1_hqiy5x.jpg"
            alt=""
          />
        </div>
        <br />
        <div>
          <img
            className="imge img-fluid"
            src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708420538/Fusion%20Lab%20website%20Images/Picture2_gbh9t9.jpg"
            alt=""
          />
        </div>
        <br />
        <img
          className="imge img-fluid"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708291189/Fusion%20Lab%20website%20Images/r1_c0uqbq.jpg"
          alt=""
        />
        <br />
        <img
          className="imge img-fluid"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708377709/Fusion%20Lab%20website%20Images/r45_fept43.jpg"
          alt=""
        />
        <img
          className="imge img-fluid"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708377709/Fusion%20Lab%20website%20Images/render1_exwhpu.jpg"
          alt=""
        />

        <div></div>
      </div>
      <Footer />
    </>
  );
}
