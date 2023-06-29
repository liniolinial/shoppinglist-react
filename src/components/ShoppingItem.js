import React, { Component } from "react";
import "./ShoppingItem.css";
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
      proCost:
        this.props.cost !== 0 && this.props.cost !== ""
          ? (this.props.cost / this.props.qty).toFixed(2)
          : 0,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateProCost = this.handleUpdateProCost.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleUpdate() {
    this.setState({
      editing: true,
    });
  }

  handleRemove() {
    this.props.onRemove(this.props.id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onUpdate(
      {
        name: this.state.name,
        qty: this.state.qty,
        cost: this.state.cost,
        proCost: this.state.proCost,
        id: this.props.id,
      },
      this.props.id,
      //weil id nicht in diesem Component gibt: props.id
    );
    this.setState({
      ...this.state,
      editing: false,
    });
  }

  //proCost sollte automatisch nach der User eingabe geupdated sein
  // noch ein Update
  handleUpdateProCost() {
    const { cost, qty } = this.state;
    const numCost = +cost;
    const numQty = +qty;
    const updatedProCost =
      numCost !== 0 && !isNaN(numCost) && !isNaN(numQty) && numQty !== 0
        ? numCost / numQty
        : 0;
    const roundedUpdatedProCost = updatedProCost.toFixed(2);
    this.setState({
      proCost: roundedUpdatedProCost,
    });
  }

  //vllt hier proCost update, weil bei changes von anderen Values sollte proCost sich auch ändern
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      this.handleUpdateProCost,
    );
  }

  handleToggle(e) {
    this.props.onToggle(this.props.id);
  }

  render() {
    // const remove = (
    //   <FontAwesomeIcon icon={faTrash} style={{ color: "#87898c" }} />
    // );
    // ReactDOM.render(remove, document.body);

    let result;

    if (this.state.editing) {
      result = (
        <form className='shoppingItem-container' onSubmit={this.handleSubmit}>
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
            <button>Save</button>
          </div>
        </form>
      );
      return result;
    }

    // toggle sollte einzelne funktionieren -jeweils in span
    return (
      <div className='shoppingItem-container'>
        <ul className='ul-shoppingItem' key={this.props.id}>
          <span
            className={this.props.completed && "completed"}
            onClick={this.handleToggle}>
            {this.state.name}
          </span>
          <span
            className={this.props.completed && "completed"}
            onClick={this.handleToggle}>
            {this.state.qty}
          </span>
          <span>{this.state.cost}€ </span> <span>{this.state.proCost}€ </span>
          <div className='edit-remove-btn-container'>
            <button onClick={this.handleUpdate}>Edit</button>
            <button onClick={this.handleRemove}>X</button>
          </div>
        </ul>
      </div>
    );
  }
}
