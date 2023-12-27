// Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; 

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const URI = import.meta.env.VITE_APP_URL;
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(URI+"/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 400) {
      alert("User is not registered");
    }

    if (!data.success) {
      alert("Invalid Password");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", data.authToken);

      console.log(localStorage.getItem("userEmail"));

      navigate("/");
    }
  };

  const addData = (e) => {
    const { name, value } = e.target;

    setCredentials(() => {
      return {
        ...credentials,
        [name]: value,
      };
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  value={credentials.email}
                  onChange={addData}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={credentials.password}
                  onChange={addData}
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to={"/signup"} className="btn btn-link">
               <button className="bg-success rounded p-2 border"> New User? Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
