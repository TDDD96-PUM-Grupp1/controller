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
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[0] }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonSingle"
          raised
        >
          {props.buttons[0]}
        </Button>
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
DrawOneButton.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export function DrawTwoButtons(props) {
  const colors = getRandomColors(2);
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[0] }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonLeft"
          raised
        >
          {props.buttons[0]}
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[1] }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButtonRight"
          raised
        >
          {props.buttons[1]}
        </Button>
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
DrawTwoButtons.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export function DrawThreeButtons(props) {
  const colors = getRandomColors(3);
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[0] }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonLeft"
          raised
        >
          {props.buttons[0]}
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[1] }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButtonRightTop"
          raised
        >
          {props.buttons[1]}
        </Button>
        <Button
          style={{ backgroundColor: colors[2] }}
          onClick={() => {
            props.gameButtonPressed(2);
          }}
          className="gameButtonRightBottom"
          raised
        >
          {props.buttons[2]}
        </Button>
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
DrawThreeButtons.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export function DrawFourButtons(props) {
  const colors = getRandomColors(4);
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[0] }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonLeftTop"
          raised
        >
          {props.buttons[0]}
        </Button>
        <Button
          style={{ backgroundColor: colors[1] }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButtonLeftBottom"
          raised
        >
          {props.buttons[2]}
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Button
          style={{ backgroundColor: colors[2] }}
          onClick={() => {
            props.gameButtonPressed(2);
          }}
          className="gameButtonRightTop"
          raised
        >
          {props.buttons[1]}
        </Button>
        <Button
          style={{ backgroundColor: colors[3] }}
          onClick={() => {
            props.gameButtonPressed(3);
          }}
          className="gameButtonRightBottom"
          raised
          primary
        >
          {props.buttons[3]}
        </Button>
      </div>
    </div>
  );
}
/* eslint-disable react/forbid-prop-types */
DrawFourButtons.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */
