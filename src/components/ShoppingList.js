import React, { Component } from "react";
import ShoppingForm from "./ShoppingForm";
import ShoppingItem from "./ShoppingItem";
import "./ShoppingList.css";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

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

  handleToggle(updatedItem, id) {
    const updatedItems = this.state.items.map((item) => {
      if (item.name === id && item.qty === id) {
        return { ...item.name, ...item.qty, completed: !item.completed };
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
        onUpdate={this.handleUpdate}
        onToggle={this.handleToggle}
        onRemove={this.handleRemove}
      />
    ));

    //  {/* hier sum: array Methode> bisherige price alle zusammen rechenen/ += für cost */}
    // idea1
    let priceSum = 0;
    this.state.items.forEach((item) => {
      priceSum += +item.cost;
    });
    // idea2
    // const priceSum = this.state.items.reduce((accumulator, item) => {
    //   return accumulator + +item.cost;
    // }, 0);

    return (
      <div>
        <h1>Shopping List</h1>
        <ul>
          <li>
            <span>Item</span> <span>Quantity</span> <span>Price(€)</span>{" "}
            <span>Single Price(€)</span>
          </li>
        </ul>
        {items}
        <h3>Price Sum: {priceSum} €</h3>
        <ShoppingForm onCreate={this.handleCreate} />
      </div>
    );
  }
}
