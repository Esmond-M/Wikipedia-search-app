import React, { Component } from "react";
import axios from "axios";
import logo from "E:/Downloads/Ususable/web developer related/my react projects/search-app/src/images/wikipedia-icon.png";
import "./Search.css";
import placeholder from "E:/Downloads/Ususable/web developer related/my react projects/search-app/src/images/wiki.svg";
const API_URL = "https://en.wikipedia.org/w/api.php";

class Search extends Component {
  state = {
    query: "",
    results: [],
    json_data: [],
    wiki_data: [],
    errorMessage: "",
    errorStyle: { display: "none" },
    image_size: { width: "60px" }
  };

  getInfo = event => {
    event.preventDefault();
    this.setState({
      searchResults: [],
      spinnerStyle: { display: "block" },
      errorStyle: { display: "none" }
    });
    axios
      .get(
        `${API_URL}?action=query&generator=search&formatversion=2&gsrsearch=${
          this.state.query
        }&piprop=thumbnail&prop=pageimages|extracts&format=json&exintro&origin=*&format=json`
      )
      .then(wiki_data => {
        this.setState({
          wiki_data: wiki_data.data.query.pages
        });

        console.log(wiki_data);

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
          errorStyle: { display: "block" }
        });
      });
  };

  handleInputChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    const { wiki_data } = this.state;

    return (
      <main className="container">
        <h3 className="text-center text-white pt-2">Wikipedia Search</h3>
        <contain className="inputMidHeight d-block mx-auto text-center">
          <img
            style={this.state.image_size}
            className="d-block mb-2 mx-auto"
            alt="wiki-logo"
            src={logo}
          />
          <form role="search" onSubmit={event => this.getInfo(event)}>
            <span className="fas fa-search"> </span>
            <input
              type="search"
              className="w-50"
              placeholder="&#x1F50E; Search for..."
              onChange={event => this.handleInputChange(event)}
              value={this.state.query}
              required
            />
            <button type="submit">
              <i className="fa fa-search" />
            </button>
          </form>
          <br />

          {wiki_data.map(wiki_data => (
            <div>{JSON.stringify(wiki_data.thumbnail)} </div>
          ))}

          <p className="text-white error-message" style={this.state.errorStyle}>
            <span className="fa fa-exclamation-circle fa-lg fa-fw" />
            {this.state.errorMessage}
          </p>
        </contain>
      </main>
    );
  }
}

export default Search;
