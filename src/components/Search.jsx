import React, { Component } from "react";
import axios from "axios";

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
      .then(json_data => {
        this.setState({ json_data: json_data.data.query.search });
        console.log(json_data);

        if (this.state.query.length === 0) {
          this.setState({
            errorMessage: ` Unable to find results for \"${
              this.state.query
            }\". Consider revising your search.`,
            errorStyle: { display: "block" }
          });
        }
      })
      .catch(error => {
        this.setState({
          errorMessage: " Unable to load Wikipedia search results.",
          spinnerStyle: { display: "none" },
          errorStyle: { display: "block" }
        });
      });
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  render() {
    const { json_data } = this.state;
    return (
      <main>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <button onClick={this.getInfo}>Get data</button>
        <ul>
          {json_data.map(json_data => (
            <li>{json_data.title}</li>
          ))}
        </ul>
        <p className="message error-message" style={this.state.errorStyle}>
          <span className="fa fa-exclamation-circle fa-lg fa-fw" />
          {this.state.errorMessage}
        </p>
      </main>
    );
  }
}

export default Search;
