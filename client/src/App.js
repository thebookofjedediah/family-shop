import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import CustomNav from "./components/CustomNav";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Landing from "./components/Landing";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <CustomNav />

          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
