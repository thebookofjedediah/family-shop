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
    return (
      <section className="entire-list-page">
        <p>Items render here</p>
      </section>
    );
  }
}

export default List;
