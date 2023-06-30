import React, { Component } from "react";
import ShoppingForm from "./ShoppingForm";
import ShoppingItem from "./ShoppingItem";
import "./ShoppingList.scss";
// import ReactDOM from "react-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

// const remove = <FontAwesomeIcon icon={faTrash} style={{ color: "#87898c" }} />;
// ReactDOM.render(remove, document.body);

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleRemove(id) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id),
    });
  }

  handleUpdate(updatedItem, id) {
    const updatedItems = this.state.items.map((item) => {
      if (item.id === id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    this.setState({
      items: updatedItems,
    });
  }

  handleToggle(id) {
    const updatedItems = this.state.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.name.completed || !item.qty.completed,
        };
      } else {
        return item;
      }
    });
    this.setState({
      items: updatedItems,
    });
  }

  handleCreate(newItem) {
    this.setState({
      items: [...this.state.items, newItem],
    });
  }

  render() {
    const items = this.state.items.map((item) => (
      <ShoppingItem
        key={item.id}
        id={item.id}
        name={item.name}
        qty={item.qty}
        cost={item.cost}
        proCost={item.proCost}
        completed={item.completed}
        onUpdate={this.handleUpdate}
        onToggle={this.handleToggle}
        onRemove={this.handleRemove}
      />
    ));

    //  {/* hier sum: array Methode> bisherige price alle zusammen rechenen/ += für cost */}
    // idea1
    // let priceSum = 0;
    // this.state.items.forEach((item) => {
    //   priceSum += +item.cost;
    // });

    // idea2
    // const priceSum = this.state.items.reduce((accumulator, item) => {
    //   return accumulator + +item.cost;
    // }, 0);

    return (
      <div className='ShoppingList'>
        <h1 className='ShoppingList__h1'>Shopping List</h1>
        <ul className='ShoppingList__items'>
          {" "}
          <span className='ShoppingList__item'>Item</span>{" "}
          <span className='ShoppingList__item'>Quantity</span>{" "}
          <span className='ShoppingList__item'>Price(€)</span>{" "}
          <span className='ShoppingList__item'>Single Price(€)</span>
        </ul>
        <hr></hr>
        {items}
        <h3 className='ShoppingList__h3'>Price Sum: {this.priceSum} €</h3>
        <ShoppingForm onCreate={this.handleCreate} />
      </div>
    );
  }

  get priceSum() {
    let priceSum = 0;
    this.state.items.forEach((item) => {
      priceSum += +item.cost;
    });

    return priceSum;
  }
}
//getter kein param, class line
