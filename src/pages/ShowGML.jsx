import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./Vote.css";
import "./ShowGML.css";

export default function Show3D() {
  return (
    <Container className="vote">
      <Row className="header">
        <Navbar />
      </Row>
      <Row className="canvas">
        <Image
          src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765031/shivam-tripathi-IqlR22SCX9U-unsplash_npwkdg.jpg"
          fluid
        />
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}
