import React, { Component } from "react";
import axios from "axios";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("user"),
      items: [],
      title: ""
    };
  }

  componentWillMount(items) {
    axios
      .get("/items", items)
      .then(res => this.setState({ items: res.data.items }))
      .catch(err => {
        console.log(err);
      });
  }

  addItem(item) {
    console.log("Made it to item creation", item);
    axios
      .post("/item/create", item)
      .then(res => {})
      .catch(err => {
        console.log("At error item create", err);
      });
  }

  handleSubmit = e => {
    const { title } = this.state;
    e.preventDefault();
    const item = { title };
    this.addItem(item);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    console.log(this.state.items);
    return (
      <section className="entire-list-page">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              value={this.state.content}
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
        </form>

        <p>{this.items}</p>
      </section>
    );
  }
}

export default List;
