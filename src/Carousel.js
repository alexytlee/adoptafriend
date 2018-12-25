import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;

    let hero = "http://placecorgi.com/300/300";
    if (photos[active] && photos[active].value) {
      hero = photos[active].value;
    }

    return (
      <div className="jumbotron text-center">
        <div className="row">
          <div className="col-md-6">
            <img src={hero} alt="animal" className="rounded  float-right" />
          </div>
          <div className="carousel-smaller col-md-6">
            {photos.map((photo, index) => (
              /* eslint-disable-next-line */
              <img
                onClick={this.handleIndexClick}
                data-index={index}
                key={photo.value}
                src={photo.value}
                className={
                  index === active ? "active  float-left" : " float-left"
                }
                alt="animal thumbnail"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
