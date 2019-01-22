import React, { Component } from "react";
import axios from "axios";
import logo from "E:/Downloads/Ususable/web developer related/my react projects/search-app/src/images/wikipedia-icon.png";
import "./Search.css";
const API_URL = "https://en.wikipedia.org/w/api.php";

class Search extends Component {
  state = {
    query: "",
    results: [],
    json_data: [],
    json_data_images: [],
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
        `${API_URL}?action=query&list=search&srsearch=${
          this.state.query
        }&generator=search&gsrsearch=${
          this.state.query
        }&prop=pageimages|revisions&rvprop=content&rvsection=0&origin=*&format=json`
      )
      .then(json_data => {
        this.setState({
          json_data: json_data.data.query.search,
          json_data_images: json_data.data.query.pages
        });
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
    const { json_data } = this.state;
    const { json_data_images } = this.state;
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
            />{" "}
            <button type="submit">
              <i className="fa fa-search" />
            </button>
          </form>
          <br />

          {json_data.map(json_data => (
            <article className=" bg-black mt-4  mb-2 article-width mx-auto">
              <h2 className="pt-2 pl-3 text-white text-left">
                {json_data.title}
              </h2>
              <p
                className="text-white text-left pb-2 pl-3"
                dangerouslySetInnerHTML={{ __html: `${json_data.snippet}...` }}
              />
              <a
                className=""
                href={`https://en.wikipedia.org/wiki/${json_data.title}`}
                target="_blank"
              >
                Continue Reading...
              </a>
            </article>
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
