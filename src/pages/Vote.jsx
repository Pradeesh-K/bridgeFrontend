import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Vote.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import KitchenSink from "../components/KitchenSink";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Review from "../components/Review";
import ShowReview from "../components/ShowReview";
import Button from "react-bootstrap/Button";
const jwtToken = localStorage.getItem('dbToken');
const backendURL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5555";

export default function Vote() {
  const [bridge, setBridge] = useState([]);
  const [loading, setLoading] = useState(false);
  // const id = "656513d3261af7dd3ac753ae";
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`${backendURL}/bridges/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
      },
    })
      .then((response) => {
        // console.log(response.data);
        setBridge(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="votePage">
      <Navbar />
      <div className="content d-flex justify-content-between">
        <div className="leftContent">
          {loading ? (
            <Spinner animation="border" variant="primary" className="mx-auto" />
          ) : (
            <div>
              <KitchenSink bridge={bridge} />
            </div>
          )}
        </div>
        <div className="rightContent">
          <div>
            <Link
              to={`/bridges/3d/${bridge._id}`}
              style={{ textDecoration: "none"}}
            >
              <button className="btn btn-warning mt-1 btn-lg col-12">
                View in 3D
              </button>
           
            </Link>
            <Link
              to={`https://ion.cesium.com/stories/viewer/?id=0e40e49e-3921-4afe-af09-d29c06aa0a61`}
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-secondary mt-1 btn-lg col-12">
                View City Model
              </button>
            </Link>
          </div>
          <div>
            <Review id={bridge._id} />
          </div>
          <div className="reviews">
            <h4>Reviews</h4>
            {bridge.reviews ? (
              bridge.reviews.map((review) => (
                <ShowReview review={review} key={review._id} />
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
