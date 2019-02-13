import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  createUser(user) {
    console.log("Made it to sign up user", user);
    axios
      .post("users", user)
      .then(res => {
        localStorage.setItem("user", res.data.email);
        localStorage.setItem("userId", res.data.id);
        this.props.history.push("/list");
      })
      .catch(err => {
        console.log("At error signing up", err);
      });
  }

  handleSubmit = e => {
    const { email, password, passwordConfirmation } = this.state;
    e.preventDefault();
    const user = { email, password, passwordConfirmation };
    this.createUser(user);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    return (
      <div className="entire-signup">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.content}
              onChange={this.handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
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

export default SignUp;
