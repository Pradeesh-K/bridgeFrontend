import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";
import { Link,  useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';
import { useState } from "react";






export default function OTP({source}) {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtp, setIsOtp] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSubmitNumber = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendURL}/auth/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        setIsOtp(true);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error sending phone number:', error);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendURL}/auth/otpVerify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        localStorage.setItem('dbToken', data.token);
        setAlertVisible(true); 
        // Handle success, e.g., redirect or set user as authenticated
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  




  

  return (
    <>
      <Navbar />
      <div className="content d-flex justify-content-between">
        <img
          className="login img-fluid"
          src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1707423373/Rectangle_11_q7mxlv.jpg"
          alt=""
        />
        <div className="login-form">
          <h2 className="heading text-center">Verify </h2>
          { !isOtp ?  
                    (<form onSubmit={handleSubmitNumber}>

                    <div className="form-group mb-4">
                      <label for="exampleInputEmail1"></label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter your phone number to verify"
                        name ="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="button text-center">
                      <div className="buttonText text-center">Verify</div>
                    </button>
                  </form>) : (
  <form onSubmit={handleSubmitOtp}>
    <div className="form-group mb-4">
      <label htmlFor="phoneNumberDisplay">Phone Number:</label>
      <input
        type="text"
        className="form-control form-control-lg"
        id="phoneNumberDisplay"
        value={phoneNumber} // Display the phone number, non-editable
        readOnly
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="otpInput"></label>
      <input
        type="number"
        className="form-control form-control-lg"
        id="otpInput"
        placeholder="Enter OTP"
        name="otp"
        onChange={(e) => setOtp(e.target.value)}
      />
    </div>

    <button type="submit" className="button text-center">
      <div className="buttonTextOtp">Submit OTP</div>
    </button>
  </form>
)}
         
          <p className="sigCover">Not resigtered ?  <Link to={`/signup`} style={{ textDecoration: "none" }}><b className="signin">Sign up</b></Link></p>
          {alertVisible && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> You can now answer survey, vote and comment of your favourite design.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
        </div>
      )}          
        </div>
      </div>
      <Footer />
    </>
  );
}
