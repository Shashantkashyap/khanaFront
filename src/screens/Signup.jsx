// Signup.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for custom styles

function Signup() {
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_APP_URL;

  const [credentials, setCredentials] = useState({
    fname: "",
    email: "",
    password: "",
    geoLocation: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(URI+"/createUser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.fname,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geoLocation
      })
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 400) {
      alert("Email is already registered");
      navigate("/login");
    }

    if (!data.success) {
      alert("Enter valid credentials");
    }
    if(data.success){
      alert("User registered Successfully")
      navigate('/');
     
    }
  };

  const addData = (e) => {
    const { name, value } = e.target;

    setCredentials(() => {
      return {
        ...credentials,
        [name]: value
      };
    });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            value={credentials.fname}
            onChange={addData}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            onChange={addData}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={addData}
            placeholder="Password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="geoLocation"
            value={credentials.geoLocation}
            onChange={addData}
            placeholder="Enter Location"
          />
        </div>

        <button type="submit" className="btn btn-success mb-btn">Submit</button>
        <Link to={"/login"} className='btn btn-danger ms-3 mb-btn'>Already a user</Link>
      </form>
      
    </div>
  );
}

export default Signup;
