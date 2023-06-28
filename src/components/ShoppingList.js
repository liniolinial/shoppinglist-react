import React, { Component } from "react";
import ShoppingForm from "./ShoppingForm";
import ShoppingItem from "./ShoppingItem";

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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
        onRemove={this.handleRemove}
      />
    ));

    //  {/* hier sum: array Methode> bisherige price alle zusammen rechenen/ += für cost */}
    // method1
    let priceSum = 0;
    this.state.items.forEach((item) => {
      priceSum += +item.cost;
    });
    // method2
    // const priceSum = this.state.items.reduce((accumulator, item) => {
    //   return accumulator + +item.cost;
    // }, 0);

    return (
      <div>
        <h1>Shopping List</h1>
        <ul>
          <li>
            Item__________Quantity__________Price(€)__________Single Price(€)
          </li>
        </ul>
        {items}
        <h3>Price Sum: {priceSum} €</h3>
        <ShoppingForm onCreate={this.handleCreate} />
      </div>
    );
  }
}
