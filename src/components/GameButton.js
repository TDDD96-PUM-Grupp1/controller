import React from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';
import Colors from '../datamanagers/Colors';
import { randomIntFromInterval } from '../datamanagers/Randomizer';

function getRandomColors(amount) {
  // Generate interval, to ensure dupliate colors wont appear. -2 to remove black and white
  const interval = Math.floor((Colors.length - 2) / amount);
  // Generate random number within interval.
  const randomNumber = randomIntFromInterval(interval);
  // Store generated colors.
  const colorList = [];

  for (let i = 0; i < amount; i += 1) {
    colorList.push(Colors[i * interval + randomNumber].hex);
  }

  return colorList;
}

export function DrawOneButton(props) {
  const colors = getRandomColors(2);
  return (
    <div className="md-grid gameButtonContainer">
      <Button
        style={{ backgroundColor: colors[0] }}
        onClick={props.gameButtonPressed(1)}
        className="gameButton2x1"
        flat
      >
        1
      </Button>
      <Button
        style={{ backgroundColor: colors[1] }}
        onClick={props.gameButtonPressed(1)}
        className="gameButton2x1"
        flat
      >
        1
      </Button>
    </div>
  );
}

DrawOneButton.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
};

export function DrawTwoButtons(props) {
  const colors = getRandomColors(2);
  return (
    <div className="md-grid gameButtonContainer">
      <Button
        style={{ backgroundColor: colors[0] }}
        onClick={props.gameButtonPressed(1)}
        className="gameButton2x1"
        flat
      >
        1
      </Button>
      <Button
        style={{ backgroundColor: colors[1] }}
        onClick={props.gameButtonPressed(2)}
        className="gameButton2x1"
        flat
      >
        2
      </Button>
    </div>
  );
}

DrawTwoButtons.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
};

export function DrawThreeButtons(props) {
  const colors = getRandomColors(3);
  return (
    <div className="md-grid gameButtonContainer">
      <Button
        style={{ backgroundColor: colors[0] }}
        onClick={props.gameButtonPressed(1)}
        className="gameButton2x2"
        flat
      >
        1
      </Button>
      <div>
        <Button
          style={{ backgroundColor: colors[1] }}
          onClick={props.gameButtonPressed(2)}
          className="gameButton2x2"
          flat
        >
          2
        </Button>
        <Button
          style={{ backgroundColor: colors[2] }}
          onClick={props.gameButtonPressed(3)}
          className="gameButton2x2"
          flat
        >
          3
        </Button>
      </div>
    </div>
  );
}

DrawThreeButtons.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
};

export function DrawFourButtons(props) {
  const colors = getRandomColors(4);
  return (
    <div className="md-grid gameButtonContainer">
      <div>
        <Button
          style={{ backgroundColor: colors[0] }}
          onClick={props.gameButtonPressed(1)}
          className="gameButton2x2"
          flat
        >
          1
        </Button>
        <Button
          style={{ backgroundColor: colors[1] }}
          onClick={props.gameButtonPressed(2)}
          className="gameButton2x2"
          flat
        >
          3
        </Button>
      </div>
      <div>
        <Button
          style={{ backgroundColor: colors[2] }}
          onClick={props.gameButtonPressed(3)}
          className="gameButton2x2"
          flat
        >
          2
        </Button>
        <Button
          style={{ backgroundColor: colors[3] }}
          onClick={props.gameButtonPressed(4)}
          className="gameButton2x2"
          flat
        >
          4
        </Button>
      </div>
    </div>
  );
}

DrawFourButtons.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
};
