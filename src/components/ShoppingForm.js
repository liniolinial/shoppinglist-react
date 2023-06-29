import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ShoppingForm.css";

export default class ShoppingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      qty: "",
      cost: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newItem = { ...this.state, id: uuidv4(), completed: false };
    this.props.onCreate(newItem);
    this.setState({
      name: "",
      qty: "",
      cost: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-flex-in-grid'>
          <label htmlFor='name'>Item: </label>
          <input
            id='name'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-flex-in-grid'>
          <label htmlFor='qty'>Quantity: </label>
          <input
            id='qty'
            name='qty'
            value={this.state.qty}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-flex-in-grid'>
          <label htmlFor='cost'>Price(€): </label>
          <input
            id='cost'
            name='cost'
            value={this.state.cost}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-flex-in-grid'>
          <button>Add</button>
        </div>
      </form>
    );
  }
}
