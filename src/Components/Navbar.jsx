import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {

  const navigate = useNavigate()

  let data = useCart()

  const [cartView, setCartView] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic me-5" to="/">
            KHANA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>

                <Link to={"/signup"} className="btn bg-white text-success mx-1">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  
                  className="btn bg-white text-success mx-2 " onClick={()=> {setCartView(true)}}
                >
                  Cart
                  <div>
                    <Badge pill bg="success">{data.length}</Badge>
                  </div>
                </Link>

                {
                  cartView ? (<Modal onClose={()=>{setCartView(false)}} ><Cart></Cart></Modal>) : ("") 
                }

                <Link
                  to={"/login"}
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
