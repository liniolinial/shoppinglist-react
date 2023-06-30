import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ShoppingForm.scss";

export default class ShoppingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "",
      qty: this.props.qty || "",
      cost: this.props.cost || "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  emitCreate() {
    if (!this.props.onCreate) return;
    const newItem = { ...this.state, id: uuidv4(), completed: false };
    this.props.onCreate(newItem);
  }

  emitUpdate() {
    if (!this.props.onUpdate) return;
    const newItem = { ...this.state, id: this.props.id, completed: false };
    this.props.onUpdate(newItem);
  }

  handleSubmit(e) {
    // don't repeat yourself
    e.preventDefault();
    this.emitCreate();
    this.emitUpdate();
    this.clearForm();
  }

  clearForm() {
    this.setState({
      name: "",
      qty: "",
      cost: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='shopping-form'>
        <div className='shopping-form__flex'>
          <label htmlFor='name'>Item: </label>
          <input
            required
            className='general-input'
            id='name'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className='shopping-form__flex'>
          <label htmlFor='qty'>Quantity: </label>
          <input
            required
            className='general-input'
            id='qty'
            name='qty'
            type='number'
            value={this.state.qty}
            onChange={this.handleChange}
          />
        </div>
        <div className='shopping-form__flex'>
          <label htmlFor='cost'>Price(€): </label>
          <input
            required
            className='general-input'
            id='cost'
            name='cost'
            type='number'
            value={this.state.cost}
            onChange={this.handleChange}
          />
        </div>
        <div className='shopping-form__flex'>
          <button type='submit' className='general-btn'>
            {this.props.buttonLabel || "Add"}
          </button>
        </div>
      </form>
    );
  }
}
