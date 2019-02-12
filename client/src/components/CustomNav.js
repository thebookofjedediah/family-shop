import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomNav extends Component {
  render() {
    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              FamilyShop
            </Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Out
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <nav class="navbar fixed-bottom navbar-light bg-light">
          <p>All rights reserved @ FamilyShop 2019</p>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sign Out
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default CustomNav;
