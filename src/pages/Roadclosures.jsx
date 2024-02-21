import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Roadclosures.css";

export default function Roadclosures() {
  return (
    <div>
      <Navbar />

      <div className="content d-flex flex-column">
        <h1 className="title">Upcoming Temporary Road Closures</h1>

        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708279867/Fusion%20Lab%20website%20Images/Road_closure_xv28ep.png"
        />

        <h1 className="title">Notices</h1>

        <p className="para2">
          Traffic delays, detours and short-term road closures are occasionally
          necessary to complete certain construction activities. We are taking
          measures to minimize impacts of construction on the neighbouring
          communities to ensure that access to businesses, residences in the
          area as well as emergency services (police, fire and medical response)
          access will be maintained at all times. Dates and times below may
          change due to weather conditions and other factors affecting
          construction activities. Although this list is intended to be
          comprehensive, unavoidable emergency road detours and road closures
          may occur. Please watch for workers when traveling in the area. We
          apologize for any inconvenience and thank you for your patience. There
          are many ways to stay connected with us. We encourage open dialogue
          and will work to answer your questions.
        </p>

        <br />
        <h1 className="title">Phasing/Demolition - traffic analysis </h1>
        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708362376/Fusion%20Lab%20website%20Images/Phasing_Demolition_-_traffic_analysis_kaeiqn.png"
        />
        <br />
        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708362376/Fusion%20Lab%20website%20Images/Phasing_Demolition_-_Mobility_management_toszug.png"
        />
        <br />
        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708362377/Fusion%20Lab%20website%20Images/Phasing_Demolition_stages_2_pry1pa.png"
        />
        <br />
        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708362377/Fusion%20Lab%20website%20Images/Phasing_Demolition_-_Site_facilities_plan_saizuz.png"
        />
        <br />
        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708362378/Fusion%20Lab%20website%20Images/Phasing_Demolition_-_stages_yqhxzl.png"
        />
        <br />
        <img
          className="rectangle"
          src="https://res.cloudinary.com/dlj8wpkzr/image/upload/v1708362423/Fusion%20Lab%20website%20Images/cycle_close_road_mnpzdc.png"
        />
      </div>

      <Footer />
    </div>
  );
}
