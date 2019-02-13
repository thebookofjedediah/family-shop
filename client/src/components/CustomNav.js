import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class CustomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLanding: false,
      email: localStorage.getItem("user")
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    console.log("made it to sign out");
    axios.get("/users/sign_out").then(res => {
      localStorage.removeItem("user", this.email);
      localStorage.removeItem("userId", this.id);
      this.setState({ toLanding: true });
    });
  }
  render() {
    if (this.state.toLanding) {
      return <Redirect to="/" />;
    }
    const user = localStorage.getItem("user");
    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              FamilyShop
            </Link>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="signup">
                    Sign Up
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" onClick={this.handleSignOut}>
                    Sign Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <nav className="navbar fixed-bottom navbar-light bg-light">
          <p>All rights reserved @ FamilyShop 2019</p>
          <ul className="navbar-nav ml-auto">
            {user && (
              <li className="nav-item">
                <Link className="nav-link" onClick={this.handleSignOut}>
                  Sign Out
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </section>
    );
  }
}

export default CustomNav;
