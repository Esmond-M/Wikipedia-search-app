import React, { Component } from "react";
import axios from "axios";

const API_KEY = "f4dcebcdbd09339fefc068d26021a70a";
const API_URL = "https://en.wikipedia.org/w/api.php";

class Search extends Component {
  state = {
    query: "",
    results: [],
    json_data: []
  };

  getInfo = () => {
    axios
      .get(
        `${API_URL}?action=query&list=search&srsearch=${
          this.state.query
        }&origin=*&format=json`
      )
      .then(res => {
        const json_data = res.data;
        this.setState({ json_data });
        console.log(json_data);
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        }
      }
    );
  };

  render() {
    return (
      <main>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
      </main>
    );
  }
}

export default Search;
