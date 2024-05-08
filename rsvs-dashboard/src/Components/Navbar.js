import React from "react";
import { Link, Outlet } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid justify-content-end">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          
            <Link to='/' element={<Home/>} class='text-back'><navigator>RSVS</navigator></Link>
          <div class="input-group justify-content-center">
            <input
              type="text"
              class="form-control border-info-subtle rounded-s-3 ms-5"
              placeholder="search..."
            />
            <button class="btn bg-info-subtle rounded-e-5 me-5">Search</button>
          </div>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <div class="d-flex">
                {/* <li class="nav-item mx-3">
                  <Link class="nav-link" to="/" path={<Home />}>
                    Home
                  </Link>
                </li> */}
                <li class='nav-item dropdown'>
                  
                </li>
                <li class="nav-item mx-3">
                  <Link class="nav-link" to="/login" path={<Login />}>
                    Login
                  </Link>
                </li>
                {/*<li class="nav-item mx-3">
        <Link class='nav-link' to='/signup' path={<Signup/>}>
            SignUp
            </Link>
        </li> */}
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
