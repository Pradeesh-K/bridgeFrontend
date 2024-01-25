/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./Footer.css";
import SendIcon from '@mui/icons-material/Send';

export default function Footer() {
  return (
    <>
    <div className={`FAQ `}>
      <img className="linked-in" alt="Linked in" src="https://c.animaapp.com/US1QeTJu/img/linkedin-1@2x.png" />
      <img className="you-tube" alt="You tube" src="https://c.animaapp.com/US1QeTJu/img/youtube-2@2x.png" />
      <img className="instagram" alt="Instagram" src="https://c.animaapp.com/US1QeTJu/img/instagram-2@2x.png" />
      <img className="twitter" alt="Twitter" src="https://c.animaapp.com/US1QeTJu/img/twitter-2@2x.png" />
      <button className="button">Become an email subscriber</button>
      <div className="group-3">
        <button className="button-2">contact us |</button>
        <button className="button-3">login |</button>
        <button className="button-4">FAQ |</button>
        <button className="button-5">privacy</button>
      </div>
      <div className="DONNERSBERGERBRÜKE">Donnersbergerbrüke</div>
      <img className="img" alt="Vector" src={"https://c.animaapp.com/US1QeTJu/img/vector-4.svg"} />
    </div>
    </>
    
  );
};
