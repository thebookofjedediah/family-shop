import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

class Landing extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/carousel-one.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/carousel-two.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <section className="selling-section">
          <h2 className="selling-point">How Does It Work?</h2>
          <p className="point1">
            Sign in and you can make changes to a real-time shopping list. This
            will enable you and your family to divide and conquor to make the
            errands that much quicker.
          </p>
        </section>
      </div>
    );
  }
}

export default Landing;
