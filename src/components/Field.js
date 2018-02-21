/* eslint-disable prettier/prettier */
import React from 'react';
/*
export class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}*/

class Square extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Clicked!');
  }
  render() {
    return (
      <div>
        <button className="square" onClick={this.handleClick}>
          Button
          {/* TODO */}
        </button>

        <form>
          First name:<br />
          <input type="te xt" name="firstname" />
          <br />
          Last name:<br />
          <input type="text" name="lastname" />
        </form>
      </div>
    );
  }
}

class foo extends React.Component {}

export default Square;
