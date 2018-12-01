import React from 'react';
import { Link } from 'react-router-dom';
import Span from '../Span/Span';
import './Nav.css'

const Nav = () => (
  <nav class="navbar navbar-light" style="background-color: #9F1A72;">
    <Link className="navbar-brand" to="/">
     <div className="shadow"> COMICS<span className="blue">CUBBY</span></div>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse ml-auto" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link" to="/characters">
            Characters
          </Link>
        <li className="nav-item">
          <Link className="nav-link" to="/new releases">
            New Releases
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/kids">
            Kids
          </Link>
        <li className="nav-item">
          <Link className="nav-link" to="/saved">
            Your Cubby
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;