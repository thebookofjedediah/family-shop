import React, { Component } from "react";
import axios from "axios";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("user"),
      items: [],
      title: "",
      isEditing: false
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
    axios
      .post("/item/create", item)
      .then(res => {
        this.setState({ items: [...this.state.items, res.data] });
      })
      .catch(err => {
        console.log("At error item create", err);
      });
  }

  deleteItem(id) {
    axios
      .post(`/item/${id}/destroy`)
      .then(res => {
        this.setState({
          items: this.state.items.filter(item => {
            return item.id !== id;
          })
        });
      })
      .catch(err => {
        console.log("error at deleteItem", err);
      });
  }
  editItem(id) {
    console.log("made it to edit item");
    axios
      .get(`/item/${id}/edit`, id)
      .then(res => {
        this.setState({ isEditing: true });
      })
      .catch(err => {
        console.log("error at editItem", err);
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
    const { items, isEditing } = this.state;
    if (isEditing === true) {
      return (
        <section className="entire-list-page ">
          <form className="login-form row justify-content-center">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                value={this.state.title}
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  Update Item
                </button>
              </div>
            </div>
          </form>
        </section>
      );
    } else {
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
              {items.length > 0
                ? items.map((item, id) => {
                    return (
                      <div>
                        <li
                          className="list-group-item list-group-item-action"
                          key={id}
                        >
                          {item.title}
                        </li>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => this.editItem(item.id, item.title)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })
                : ""}
            </ul>
          </div>
          <p>{this.items}</p>
        </section>
      );
    }
  }
}

export default List;
