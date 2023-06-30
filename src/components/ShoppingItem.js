import React, { Component } from "react";
import "./ShoppingItem.scss";
import ShoppingForm from "./ShoppingForm";
// import ReactDOM from "react-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default class ShoppingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name,
      qty: this.props.qty,
      cost: this.props.cost,
      // proCost: !!this.props.cost
      //   ? (this.props.cost / this.props.qty).toFixed(2)
      //   : 0,
      proCost: this.calcProCost(this.props.qty, this.props.cost),
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleUpdateProCost = this.handleUpdateProCost.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleEdit() {
    this.setState({
      editing: true,
    });
  }

  handleRemove() {
    this.props.onRemove(this.props.id);
  }

  handleUpdate(newItem) {
    newItem.proCost = this.calcProCost(newItem.qty, newItem.cost);
    this.props.onUpdate(
      // {
      //   name: this.state.name,
      //   qty: this.state.qty,
      //   cost: this.state.cost,
      //   proCost: this.state.proCost,
      //   id: this.props.id,
      //   newItem
      // },
      newItem,
      newItem.id,
    );
    console.log(newItem, this.props.id);
    this.setState({
      ...newItem,
      editing: false,
    });
  }

  calcProCost(qty, cost) {
    return cost !== 0 && !isNaN(cost) && !isNaN(qty) && qty !== 0
      ? (cost / qty).toFixed(2)
      : 0;
  }
  //proCost sollte automatisch nach der User eingabe geupdated sein
  // handleUpdateProCost() {
  //   const { cost, qty } = this.state;
  //   const updatedProCost =
  //     cost !== 0 && !isNaN(cost) && !isNaN(qty) && qty !== 0
  //       ? (cost / qty).toFixed(2)
  //       : 0;
  //   this.setState({
  //     proCost: updatedProCost,
  //   });
  // }

  //vllt hier proCost update, weil bei changes von anderen Values sollte proCost sich auch ändern
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      this.handleUpdateProCost,
    );
  }

  handleToggle() {
    this.props.onToggle(this.props.id);
  }

  render() {
    if (this.state.editing) {
      return (
        <ShoppingForm
          onUpdate={this.handleUpdate}
          name={this.state.name}
          qty={this.state.qty}
          cost={this.state.cost}
          buttonLabel='save'
          id={this.props.id}
        />
        // <form className='shopping-item-form' onSubmit={this.handleSubmit}>
        //   <div>
        //     <label htmlFor='name'>Item: </label>
        //     <input
        //       className='general-input'
        //       id='name'
        //       name='name'
        //       value={this.state.name}
        //       onChange={this.handleChange}
        //     />
        //   </div>
        //   <div>
        //     <label htmlFor='qty'>Quantity: </label>
        //     <input
        //       className='general-input'
        //       id='qty'
        //       name='qty'
        //       value={this.state.qty}
        //       onChange={this.handleChange}
        //     />
        //   </div>
        //   <div>
        //     <label htmlFor='cost'>Price(€): </label>
        //     <input
        //       className='general-input'
        //       id='cost'
        //       name='cost'
        //       value={this.state.cost}
        //       onChange={this.handleChange}
        //     />
        //   </div>
        //   <div>
        //     <button className='general-btn'>Save</button>
        //   </div>
        // </form>
      );
    }

    // toggle sollte einzelne funktionieren -jeweils in span
    return (
      <div className='shopping-item'>
        <div className='shopping-item__grid' key={this.props.id}>
          <span
            className={this.props.completed ? "completed" : ""}
            onClick={this.handleToggle}>
            {this.state.name}
          </span>
          <span
            className={this.props.completed ? "completed" : ""}
            onClick={this.handleToggle}>
            {this.state.qty}
          </span>
          <span>{this.state.cost}€ </span> <span>{this.state.proCost}€ </span>
          <div className='shopping-item__flex'>
            <button
              className='shopping-item__btn general-btn'
              onClick={this.handleEdit}>
              Edit
            </button>
            <button
              className='shopping-item__btn general-btn'
              onClick={this.handleRemove}>
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}
