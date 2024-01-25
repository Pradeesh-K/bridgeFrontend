import React from "react";
import "./Index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';


export default function Index() {
    const [bridges, setBridges] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        setLoading(true);
        axios
            .get(`${backendURL}/bridges`)
            .then((response) => {
                console.log(response.data);
                setBridges(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });
    }, [])


    return (
        <div>
            <Navbar />
            <div className="main d-flex flex-column">
                <div >
                    <h2 className="text-center">YOUR OPINION MATTERS</h2>
                    <p className="text-center">
                        Click any image to see more details or leave a comment. Hover to view
                        a zoomed image!
                    </p>
                </div>
                <div className="d-flex flex-row">
                    {loading ?
                        (<Spinner animation="border" variant="primary" className="mx-auto" />
                        ) : (
                            // <Container><Row><p >Spinner working</p></Row></Container>)

                            bridges.map((bridge) => (
                                //   <Col key={bridge._id} xs={12} sm={6} md={4} lg={4} className="mb-4 px-auto">
                                //     <BridgeCard bridge={bridge} className="px-auto mx-auto"/>
                                //   </Col>
                                <Link to={`/bridges/details/${bridge._id}`} key={bridge.id} style={{ textDecoration: "none" }}>
                                    <div className="option d-flex flex-column align-items-center">
                                        <img className="image-vote" src={bridge.images[0]} alt={`Bridge ${bridge.id}`} />
                                        <button className="button-vote">OPTION {bridge.ifcLink}</button>
                                    </div>
                                </Link>
                            ))

                        )
                    }
            </div>
             {/* <Link to={`/bridges/details`} style={{ textDecoration: "none" }}>
                <div className="option d-flex flex-column align-items-center">
                <img className="image-vote"
            //             src="https://c.animaapp.com/Bf9qfsP6/img/image-5@2x.png"
            //         />
            //         <button className="button-vote">OPTION 1</button>
            //     </div>
            //     </Link>
            //     <Link to={`/bridges/details`} style={{ textDecoration: "none" }}>
            //     <div className="option d-flex flex-column align-items-center">
            //         <img
            //             className="image-vote"
            //             alt="Image"
            //             src="https://c.animaapp.com/Bf9qfsP6/img/image-3@2x.png"
            //         />
            //         <button className="button-vote">OPTION 2</button>
            //     </div>
            //     </Link>
            //     <Link to={`/bridges/details`} style={{ textDecoration: "none" }}>
            //     <div className="option d-flex flex-column align-items-center">
            //         <img
            //             className="image-vote"
            //             alt="Image"
            //             src="https://c.animaapp.com/Bf9qfsP6/img/image-7@2x.png"
            //         />
            //         <button className="button-vote">OPTION 3</button>
            //     </div>
            //     </Link>
            //     <Link to={`/bridges/details`} style={{ textDecoration: "none" }}>
            //     <div className="option d-flex flex-column align-items-center">
            //         <img
            //             className="image-vote"
            //             alt="Image"
            //             src="https://c.animaapp.com/Bf9qfsP6/img/image-8@2x.png"
            //         />
            //         <button className="button-vote">OPTION 4</button>
            //     </div>
            //     </Link>
            //     <Link to={`/bridges/details`} style={{ textDecoration: "none" }}>
            //     <div className="option d-flex flex-column align-items-center">
            //         <img
            //             className="image-vote"
            //             alt="Image"
            //             src="https://c.animaapp.com/Bf9qfsP6/img/image-9@2x.png"
            //         />
            //         <button className="button-vote">OPTION 5</button>
            //     </div>
            //     </Link> */}
            

                <div className="d-flex flex-column m-5">
                    <p className="thank text-center">THANK YOU FOR YOUR PARTICIPATION</p>
                    <p className="text-left">
                        This collaborative approach not only engages the citizens in the
                        decision-making process but also ensures that the new bridge reflects
                        the collective vision and preferences of the community. Munich&#39;s
                        residents are encouraged to share their thoughts, ideas, and
                        aspirations for the bridge, transforming it into a collective
                        masterpiece that resonates with the spirit of the city.
                        <br />
                        <br />
                        Taking part in this survey is not just an opportunity for citizens to
                        have a say in the aesthetics and functionality of the bridge but also
                        a chance to leave an indelible mark on the city&#39;s landscape. The
                        inclusive nature of this initiative fosters a sense of community pride
                        and ownership in the upcoming project.
                    </p>
                </div>

            </div>
            <Footer />
        </div>
    );
}
