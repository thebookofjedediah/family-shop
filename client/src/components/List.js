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
        this.setState({ items: [...this.state.items, res.data], title: "" });
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

  editItem(id, title) {
    console.log("made it to edit item");
    axios
      .get(`/item/${id}/edit`)
      .then(res => {
        this.setState({
          isEditing: true,
          title: res.data.title,
          itemId: res.data.id
        });
        console.log("edit item response", res.data);
      })
      .catch(err => {
        console.log("error at editItem", err);
      });
  }

  updateItem() {
    const { items, itemId, title } = this.state;
    const objIndex = items.findIndex(x => x.id === itemId);
    axios
      .post(`/item/${itemId}/update`, { title })
      .then(res => {
        this.setState({
          items: items.map((item, index) =>
            index === objIndex ? { ...item, title } : item
          ),
          isEditing: false,
          title: ""
        });
      })
      .catch(err => {
        console.log("updateItem error", err);
      });
  }
  buyItem(item) {
    const { items } = this.state;
    const objIndex = items.findIndex(x => x.id === item.id);
    axios
      .post(`/item/${item.id}/buy`, { isBought: !item.isBought })
      .then(res => {
        const { isBought } = res.data;
        this.setState({
          items: items.map((item, index) =>
            index === objIndex ? { ...item, isBought } : item
          )
        });
      })
      .catch(err => {
        console.log("error at buying an item", err);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isEditing === true) {
      this.updateItem(e);
      console.log();
      e.preventDefault();
    } else {
      const { title } = this.state;
      const item = { title };
      this.addItem(item);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { items, isEditing } = this.state;
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
              value={this.state.title}
              placeholder="Add item here"
              aria-label="New Item"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              {!isEditing ? (
                <input
                  className="btn btn-outline-secondary"
                  type="submit"
                  value="Add Item"
                />
              ) : (
                <input
                  className="btn btn-outline-secondary"
                  type="submit"
                  value="Update Item"
                />
              )}
            </div>
          </div>
        </form>
        <div className="row justify-content-center">
          <ul className="list-group">
            {items.length > 0
              ? items.map((item, id) => {
                  return (
                    <div key={item.id}>
                      <li
                        className="list-group-item list-group-item-action"
                        onClick={() => this.buyItem(item)}
                      >
                        {item.title} {item.isBought ? "(bought)" : ""}
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
export default List;
