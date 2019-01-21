import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Search from "./components/Search";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default App;
