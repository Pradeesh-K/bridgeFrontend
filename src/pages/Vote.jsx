import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Vote.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import KitchenSink from "../components/KitchenSink";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Review from "../components/Review";
import ShowReview from "../components/ShowReview";
import Button from 'react-bootstrap/Button';
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';

export default function Vote() {
    const [bridge, setBridge] = useState([]);
    const [loading, setLoading] = useState(false);
    // const id = "656513d3261af7dd3ac753ae";
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${backendURL}/bridges/${id}`)
            .then((response) => {
                // console.log(response.data);
                setBridge(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });
    }, [])
    return (
        <Container className="vote">
            <Row className="header"><Navbar /></Row>

            <Row className="mt-3 flex-sm-row">
                <Col xs={8} >
                    {loading ? (<Spinner animation="border" variant="primary" className="mx-auto" />
                    ) : (
                        <div>
                            {/* <h3>efgrgfertg</h3> */}
                            <KitchenSink bridge={bridge} />
                        </div>
                    )}
                </Col>
                <Col xs={4} >
                    <Row>
                        <div >
                            <Link to={`/bridges/3d/${bridge._id}`} style={{ textDecoration: "none" , width:"60%"}}>
                            <button className="btn btn-warning mt-1 btn-lg col-12">View in 3D</button>
                                {/* <Button size="lg" variant="warning">View 3D</Button> */}
                            </Link>
                            <Link to={`https://ion.cesium.com/stories/viewer/?id=0e40e49e-3921-4afe-af09-d29c06aa0a61`} style={{ textDecoration: "none" , width:"100%"}}>
                            <button className="btn btn-secondary mt-1 btn-lg col-12">View City Model</button>
                            {/* <Button size="lg" variant="secondary">View CityModel </Button> */}
                            </Link>
                        </div>
                    </Row>
                    <Row>
                        <Review id={bridge._id} />
                    </Row>
                    <Row>
                        <h4>Reviews</h4>
                        {bridge.reviews ? (
                            bridge.reviews.map((review) => (
                                <ShowReview review={review} key={review._id} />
                            ))
                        ) : (
                            <p>No reviews available</p>
                        )}

                    </Row>
                </Col>
            </Row>
            <Row className="footer">
            <Footer />
            </Row>
        </Container>
    
    )
}