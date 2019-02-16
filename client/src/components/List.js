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
      .then(res => this.setState({ items: res.data }))
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

  deleteItem(item) {
    console.log("made it to delete item");
    axios
      .post(`/item/${item.id}/destroy`)
      .then(res => {})
      .catch(err => {
        console.log("error at deleteItem", err);
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
    const { items } = this.state;
    return (
      <section className="entire-list-page ">
        <form
          className="login-form row justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={this.handleChange}
              value={this.state.content}
              placeholder="Add item here"
              aria-label="New Item"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <input
                className="btn btn-outline-secondary"
                type="submit"
                value="Add Item"
              />
            </div>
          </div>
        </form>
        <div className="row justify-content-center">
          <ul className="list-group">
            {items.map((item, id) => {
              return (
                <div>
                  <li
                    className="list-group-item list-group-item-action"
                    key={id}
                  >
                    {item.title}
                  </li>
                  <button className="btn btn-outline-primary">Edit</button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={this.deleteItem}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
        <p>{this.items}</p>
      </section>
    );
  }
}

export default List;
