import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = { loading: true, showModal: false };
  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed;
        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }
        this.setState({
          name: data.petfinder.pet.name,
          animal: data.petfinder.pet.animal,
          location: `${data.petfinder.pet.contact.city}, ${
            data.petfinder.pet.contact.state
          }`,
          description: data.petfinder.pet.description,
          media: data.petfinder.pet.media,
          breed,
          shelterid: data.petfinder.pet.shelterid,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const {
      media,
      animal,
      breed,
      location,
      description,
      name,
      shelterid,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div className="jumbotron text-center">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <br />
          {/*
          <button type="button" className="btn text" onClick={this.toggleModal}>
            Adopt {name}
          </button>
          */}
          <br />
          <h3> About</h3>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button className="btn" onClick={this.toggleModal}>
                  Yes
                </button>
                <button className="btn" onClick={this.toggleModal}>
                  No
                </button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
