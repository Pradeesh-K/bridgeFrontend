import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Sust.css";

export default function Sust() {
  return (
    <>
      <Navbar />
      <div className="content d-flex flex-column">
        <h1 className="title text-center">OUR SUSTAINABILITY COMMITMENT</h1>
        <p className="para">
          The Authority is dedicated to promoting sustainability throughout the
          construction and operational phases of the New Donnersburgerbruke.
          Sustainability is a shared priority not only for us but also for the
          German government and our stakeholders. As a government entity, we
          recognize our responsibility to assess both the financial and
          nonfinancial impacts of our activities. This involves incorporating
          environmental, social, and economic considerations into our management
          approach and striving to provide benefits to the nearby communities
          whenever feasible. Our commitment extends to integrating
          sustainability into our decision-making processes, with a focus on
          continuous improvement. This includes analyzing practices,
          benchmarking against standards, evaluating risks and opportunities,
          and actively involving stakeholders in discussions on pertinent
          issues. We firmly believe that the future success of the New
          Donnersburgerbruke relies on the sustainable practices we implement
          today and in the years ahead.
        </p>
        <h2 className="heading2">Project sustainability goals and objectives
</h2>
<div className="d-flex flex-row justify-content-between">
    <ol className="points">
        <li>Maintain safety and Security</li>
        <li>Create a culture of Leadership</li>
        <li>Design for Durability and Resiliency</li>
        <li>Provide economic opportunity</li>
        <li>Conserve non-renewable resources</li>
        <li>Protect the natural world </li>
        <li>Safeguard cultural resources</li>
        <li>Proactively engage the public</li>
    </ol>
    <img className="leaf" src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1707415113/leaf_oe7h3g.jpg" alt="leaf" />
</div>
<img className="img-fluid" src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1707415114/sust-bot_dgffri.png" alt="bottom image" />

      </div>

      <Footer />
    </>
  );
}
