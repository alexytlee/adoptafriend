import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class Search extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location" className="h3">
                Location
                <input
                  id="location"
                  onChange={context.handleLocationChange}
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal" className="h3">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="breed" className="h3">
                Breed
                <select
                  disabled={!context.breeds.length}
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button className="btn">Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Search;
