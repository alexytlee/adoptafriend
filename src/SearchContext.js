import React from "react";

const SearchContext = React.createContext({
  location: "Richmond, BC",
  animal: "",
  breed: "",
  shelterid: "",
  breeds: [],
  handleAnimalChange() {},
  handleBreedChange() {},
  handleLocationChange() {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
