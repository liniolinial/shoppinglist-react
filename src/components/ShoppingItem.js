import React, { Component } from "react";

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
          ? this.props.cost / this.props.qty
          : 0,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateProCost = this.handleUpdateProCost.bind(this);
  }

  handleUpdate() {
    this.setState({
      editing: true,
    });
  }
  // vllt proCost update auch bei hier
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
  handleUpdateProCost() {
    const { cost, qty } = this.state;
    const numCost = +cost;
    const numQty = +qty;
    const updatedProCost =
      numCost !== 0 && !isNaN(numCost) && !isNaN(numQty) && numQty !== 0
        ? numCost / numQty
        : 0;
    this.setState({
      proCost: updatedProCost,
    });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      this.handleUpdateProCost,
    );
  }

  render() {
    let result;

    if (this.state.editing) {
      result = (
        <form onSubmit={this.handleSubmit}>
          <input
            id='name'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            id='qty'
            name='qty'
            value={this.state.qty}
            onChange={this.handleChange}
          />
          <input
            id='cost'
            name='cost'
            value={this.state.cost}
            onChange={this.handleChange}
          />
          <button>save</button>
        </form>
      );
      return result;
    }

    return (
      <div>
        <ul>
          <li key={this.props.id}>
            {/* {this.props.name}:{this.props.qty}:{this.props.cost}:
          {this.state.proCost} */}
            {this.state.name}__________{this.state.qty}__________
            {this.state.cost}
            €__________
            {this.state.proCost}€{/* proCost updated sich nicht */}
          </li>
          <button onClick={this.handleUpdate}>edit</button>
          <button onClick={this.handleRemove}>X</button>
        </ul>
      </div>
    );
  }
}
