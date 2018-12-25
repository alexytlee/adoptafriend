import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { Provider } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Richmond, BC",
      animal: "",
      breed: "",
      shelterid: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
      },
      this.getBreeds
    );
  };
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      this.setState({
        breeds: []
      });
    }
  }
  render() {
    return (
      <div>
        <header>
          <div className="jumbotron text-center">
            <Link to="/">
              <i className="fas fa-dog animal" /> &nbsp;
              <i class="fas fa-cat animal" /> &nbsp;
              <i class="fas fa-kiwi-bird animal" /> &nbsp;
              <i class="fas fa-horse animal" />
              &nbsp;
              <br />
              <span className="name">Adopt a Friend</span>
            </Link>
            <Link to="/search-params">
              <br />
              <span aria-label="search" role="img" className="h2">
                <i className="fas fa-search" /> Search
              </span>
            </Link>
          </div>
        </header>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
