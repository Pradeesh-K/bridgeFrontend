import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";
import { Link,  useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';
import { useState } from "react";






export default function Login({source}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${backendURL}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    const data = await response.json();
    localStorage.setItem('username', data.username.username);
    console.log(localStorage.getItem('username') );
    location.reload(); 
    navigate('/bcf');
 
  }

  

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
          <h2 className="heading text-center">Sign in </h2>
          <p className="text-center">To test the BCF functionality use username: pradeesh , password: 1</p>
          {/* <form action={`${backendURL}/auth/login`} method="POST" > */}
          <form onSubmit={handleSubmit}>

            <div className="form-group mb-4">
              <label for="exampleInputEmail1">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your username"
                name ="username"
                onChange={(e) => setUsername(e.target.value)}

              />
            </div>
            <div className="form-group mb-4">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="exampleInputPassword1"
                placeholder="Password"
                name ="password"
                onChange={(e) => setPassword(e.target.value)}
          
              />
            </div>
            <button type="submit" className="button text-center">
              <div className="buttonText text-center">Login</div>
            </button>
          </form>
          <p className="sigCover">Not resigtered ?  <Link to={`/signup`} style={{ textDecoration: "none" }}><b className="signin">Sign up</b></Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
}
