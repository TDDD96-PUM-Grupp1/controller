import React from 'react';

class Session extends React.Component {
  constructor(props) {
    super(props);
    //TODO add validation
    this.IP = props.IP;
    this.currentlyPlaying = props.currentlyPlaying;
    this.code = props.code;
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    /*
        En session behöver
        IP
        Antal spelare
        Host name?
        Ping?
         */
  }

  foo() {
    console.log('Foo');
  }

  handleClick() {
    //TODO this click should put you in the correct session
    console.log('Clicked!');
  }

  render() {
    return (
      <div>
        <ol>
          <li>ACTIVE SESSION</li>
          <li>{this.currentlyPlaying} active players</li>
          <li>{this.code}</li>
        </ol>
      </div>
    );
  }
}

export default Session;
