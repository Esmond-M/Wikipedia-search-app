import React, { Component } from "react";
import axios from "axios";
import "./Search.css";
const API_URL = "https://en.wikipedia.org/w/api.php";

class Search extends Component {
  state = {
    query: "",
    results: [],
    json_data: [],
    errorMessage: "",
    errorStyle: { display: "none" }
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
      <main className="container">
        <contain className="inputMidHeight d-block mx-auto text-center">
          <img src="/images/wikipedia-icon" />
          <span class="fas fa-search"> </span>
          <input
            className="w-50"
            placeholder="&#x1F50E; Search for..."
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
          />
          <br />

          <button className=" btn-light  btn-lg mt-2" onClick={this.getInfo}>
            Enter
          </button>

          {json_data.map(json_data => (
            <article className=" bg-black mt-4 w-50 mx-auto">
              <h2 className="pt-2 pl-3 text-white text-left">
                {json_data.title}
              </h2>
              <p
                className="text-white text-left pb-3 pl-3"
                dangerouslySetInnerHTML={{ __html: `${json_data.snippet}...` }}
              />
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
