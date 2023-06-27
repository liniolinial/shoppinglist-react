import React, { Component } from "react";

export default class ShoppingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name,
      qty: this.props.qty,
      cost: this.props.cost,
      proCost: this.props.cost !== 0 ? this.props.cost / this.props.qty : 0,
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  // handleEdit(){
  // }

  handleRemove() {
    this.props.onRemove(this.props.id);
  }

  render() {
    return (
      <div>
        <li key={this.props.id}>
          {this.props.name}:{typeof this.props.qty}:{this.props.qty}:
          {this.props.cost}:{typeof this.state.proCost}
        </li>
        <button>edit</button>
        <button onClick={this.handleRemove}>X</button>
      </div>
    );
  }
}
