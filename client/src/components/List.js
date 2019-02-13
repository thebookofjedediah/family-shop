import React, { Component } from "react";
import axios from "axios";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentWillMount() {
    axios.get(`/items`).then(res =>
      this.setState({
        items: res.data.items
      })
    );
  }

  render() {
    console.log(this.state.items);
    return (
      <section className="entire-list-page">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add item here"
            aria-label="New Item"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Add Item
            </button>
          </div>
        </div>

        <p>{this.items}</p>
      </section>
    );
  }
}

export default List;
