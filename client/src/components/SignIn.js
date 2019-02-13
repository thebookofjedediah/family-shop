import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: ""
    };
  }

  signInUser(user) {
    console.log("Made it to sign In user", user);
    axios
      .post("/users/sign_in", user)
      .then(res => {
        localStorage.setItem("user", res.data.email);
        localStorage.setItem("userId", res.data.id);
        this.props.history.push("/list");
      })
      .catch(err => {
        console.log("At error signing in", err);
      });
  }

  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();
    const user = { email, password };
    this.signInUser(user);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div className="entire-login">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
