import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Signup.css";
import { Link } from "react-router-dom";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';
import Session from 'react-session-api'
import { useState } from "react";

export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    try {
      // Make a POST request to the backend signup route
      const response = await fetch(`${backendURL}/auth/signup`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        // Handle unsuccessful response (if needed)
        console.error('Signup failed:', response.status);
        return;
      }

      // Parse the JSON response
      const data = await response.json();

      // Access the username and redirect URL if needed
      Session.set("isLoggedIn" , "true");
      Session.set("username" , data.username);

      // Optionally, perform any actions with the data received from the server
      console.log('User registered:', data.username);

      // Redirect if needed
      window.location.href = data.redirectUrl; // Uncomment if you want to redirect
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="content d-flex justify-content-between">
        <img
          className="img-fluid"
          src="https://res.cloudinary.com/dt6vwovu0/image/upload/v1707423373/Rectangle_11_q7mxlv.jpg"
          alt=""
        />
        <div className="login-form">
          <h2 className="heading text-center">Let’s get started</h2>
          {/* <form onSubmit={handleSubmit}> */}
          <form action={`${backendURL}/auth/signup`} method="POST" >
            <div className="form-group mb-4">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleInputName"
                aria-describedby="nameHelp"
                placeholder="Enter Name"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button text-center">
              <div className="buttonText ">Create an Account</div>
            </button>
          </form>
          <p className="sigCover">Already have an account?  <Link to={`/login`} style={{ textDecoration: "none" }}><b className="signin">Sign in</b></Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
}
