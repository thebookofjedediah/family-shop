import React, { Component } from "react";

class CustomNav extends Component {
  render() {
    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              FamilyShop
            </a>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign In
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Up
                  <span className="sr-only">(current)</span>
                </a>
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
