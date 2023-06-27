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
  }

  handleRemove(id) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id),
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
        onRemove={this.handleRemove}
      />
    ));

    //  {/* hier sum: array Methode> bisherige price alle zusammen rechenen/ += für cost */}
    let priceSum = 0;
    this.state.items.forEach((item) => {
      priceSum += +item.cost;
    });

    // const priceSum = this.state.items.reduce((accumulator, item) => {
    //   return accumulator + +item.cost;
    // }, 0);

    return (
      <div>
        <h1>Shopping List</h1>
        <ShoppingForm onCreate={this.handleCreate} />
        {items}
        <h3>Price Sum: {priceSum}</h3>
      </div>
    );
  }
}
