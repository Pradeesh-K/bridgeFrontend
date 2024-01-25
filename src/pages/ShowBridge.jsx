import { useState, useEffect } from "react";
import KitchenSink from "../components/KitchenSink";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Review from "../components/Review";
import { Link} from "react-router-dom";
import ShowReview from "../components/ShowReview";
import Button from 'react-bootstrap/Button';
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';

export default function ShowBridge(){
    const [bridge, setBridge] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userIp, setUserIp] = useState('');

    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        const fetchUserIp = async () => {
            try {
              const request = await fetch("https://ipinfo.io/json?token=47a538992f4f20")
              const jsonResponse = await request.json()
            //   console.log(jsonResponse.ip, jsonResponse.country)
              setUserIp(jsonResponse.ip);
              console.log("ip fetched");
    
            } catch (error) {
              console.error('Error fetching user IP:', error);
            }
          };
      
          fetchUserIp();
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
    },[])

    return (
       <Container>
        <NavigationBar/>
        <Row className="mt-3">
            <Col>
            {loading ? (<Spinner animation="border" variant="primary"  className="mx-auto"/>
             ) : (
              <div>
                    {/* <h3>efgrgfertg</h3> */}
                 <KitchenSink bridge={bridge} ip={userIp}/> 
              </div>
             )}  
            </Col>
            <Col>
                <Row>
                <Link to={`/bridges/3d/${bridge._id}`} style={{ textDecoration: "none" }}>
                    <Button size="small"  variant="primary">View 3D</Button>
                </Link>
                </Row>
                <Row>
                    <Review id={bridge._id} ip={userIp}/>                 
                </Row>
                <Row>
                    <h4>Reviews</h4>
                    {bridge.reviews ? (
                    bridge.reviews.map((review) => (
                    <ShowReview review={review} key={review._id}/>
                    
                        // <div key={review._id}>
                    //     {review.author && (
                    //     <p>Author: {review.author.name}</p>
                    //     )}
                    //     <p>Rating: {review.rating}</p>
                    //     <p>Feedback: {review.body}</p>
                    // </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}

                </Row>
            </Col>
        </Row>
        <Footer/>
       </Container>
    )
}