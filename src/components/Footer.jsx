/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./Footer.css";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Send a POST request to the backend logout route
      await fetch(`${backendURL}/auth/logout`, {
        method: 'POST',
      }).then(() => {
        localStorage.removeItem('username');
        location.reload(); 
        navigate('/');
      }).catch((error) => {
        console.error('Logout error:', error);
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <div className="Footer">
      <div className="Content d-flex flex-column flex-md-row justify-content-between pt-sm-1 pt-md-4">
   <div  className="d-flex ">
          <img
            className="logo"
            alt="Vector"
            src={"https://c.animaapp.com/US1QeTJu/img/vector-4.svg"}
          />
          <div className="d-flex flex-column">
            <div className="name">Donnersbergerbrücke</div>
            <div>

            <Link to={`/contact`} style={{ textDecoration: "none" }}>
            <button className="links">contact us |</button>
          </Link>
          {localStorage.getItem('username') ? <button onClick={handleLogout} className="links">logout |</button> : <Link to={`/login`} style={{ textDecoration: "none" }}> 
              <button className="links">login |</button>
              </Link>  
          }
            
            <Link to={`/FAQ`} style={{ textDecoration: "none" }}>
                <button className="links">FAQ |</button>
              </Link>
            
            </div>
          </div>
   </div>
        <div className="d-flex flex-column">
          <button className="links">Become an email subscriber</button>
          <div>
            <img
              className="icons"
              alt="Linked in"
              src="https://c.animaapp.com/US1QeTJu/img/linkedin-1@2x.png"
            />
            <img
              className="icons"
              alt="You tube"
              src="https://c.animaapp.com/US1QeTJu/img/youtube-2@2x.png"
            />
            <img
              className="icons"
              alt="Instagram"
              src="https://c.animaapp.com/US1QeTJu/img/instagram-2@2x.png"
            />
            <img
              className="icons"
              alt="Twitter"
              src="https://c.animaapp.com/US1QeTJu/img/twitter-2@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
