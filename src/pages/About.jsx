import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="group1 d-flex flex-column align-items-center mt-5">
        <img
          className="imge img-fluid"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708422453/Fusion%20Lab%20website%20Images/New_about_pic_pb9qrt.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708422863/Fusion%20Lab%20website%20Images/ABOUT-PAGE2new_tyjdvr.png"
          alt=""
        />

        <br />

        <h1>Project Team Members</h1>
        <div className="d-fex flex-column">
          <img
            className="imge1"
            src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708370308/Team_vcvlhm.png"
            alt=""
          />
          <div className="d-flex justify-content-around">
            <Link
              to={`https://www.linkedin.com/in/pradeesh-karunakaran-97712543/`}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <button className="linkIn">Pradeesh</button>
            </Link>
            <Link
              to={`https://www.linkedin.com/in/madhulika-j-1959043/`}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <button className="linkIn">Madhulika </button>
            </Link>
            <Link
              to={`https://www.linkedin.com/in/g%C3%B6kay-sezer-a8951113a/`}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <button className="linkIn">Gokay </button>
            </Link>
            <Link
              to={`https://www.linkedin.com/in/keshav-kumar-7101139b/`}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <button className="linkIn">Keshav </button>
            </Link>
            <Link
              to={`https://www.linkedin.com/in/canberk-yal%C3%A7%C4%B1kl%C4%B1-96b77811b/`}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <button className="linkIn">Canberk </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
