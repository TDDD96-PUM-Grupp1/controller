import React from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';

const DISABLED_COLOR = '#AAAAAA';

export function DrawOneButton(props) {
  return (
    <div className="md-grid gameButtonContainer">
      <Button
        style={{ backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR }}
        onClick={() => {
          props.gameButtonPressed(0);
        }}
        className="gameButton1x1"
        flat
        disabled={!props.activeButtons[0]}
      >
        {props.buttons[0].name}
      </Button>
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
  return (
    <div className="md-grid gameButtonContainer">
      <Button
        style={{ backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR }}
        onClick={() => {
          props.gameButtonPressed(0);
        }}
        className="gameButton2x1"
        flat
      >
        {props.buttons[0].name}
      </Button>
      <Button
        style={{ backgroundColor: props.activeButtons[1] ? props.buttons[1].color : DISABLED_COLOR }}
        onClick={() => {
          props.gameButtonPressed(1);
        }}
        className="gameButton2x1"
        flat
      >
        {props.buttons[1].name}
      </Button>
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
  return (
    <div className="md-grid gameButtonContainer">
      <Button
        style={{ backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR }}
        onClick={() => {
          props.gameButtonPressed(0);
        }}
        className="gameButton2x2"
        flat
      >
        {props.buttons[0].name}
      </Button>
      <div>
        <Button
          style={{ backgroundColor: props.activeButtons[1] ? props.buttons[1].color : DISABLED_COLOR }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButton2x2"
          flat
        >
          {props.buttons[1].name}
        </Button>
        <Button
          style={{ backgroundColor: props.activeButtons[2] ? props.buttons[2].color : DISABLED_COLOR }}
          onClick={() => {
            props.gameButtonPressed(2);
          }}
          className="gameButton2x2"
          flat
        >
          {props.buttons[2].name}
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
  return (
    <div className="md-grid gameButtonContainer">
      <div>
        <Button
          style={{ backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButton2x2"
          flat
        >
          {props.buttons[0].name}
        </Button>
        <Button
          style={{ backgroundColor: props.activeButtons[1] ? props.buttons[1].color : DISABLED_COLOR }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButton2x2"
          flat
        >
          {props.buttons[2].name}
        </Button>
      </div>
      <div>
        <Button
          style={{ backgroundColor: props.activeButtons[2] ? props.buttons[2].color : DISABLED_COLOR }}
          onClick={() => {
            props.gameButtonPressed(2);
          }}
          className="gameButton2x2"
          flat
        >
          {props.buttons[1].name}
        </Button>
        <Button
          style={{ backgroundColor: props.activeButtons[3] ? props.buttons[3].color : DISABLED_COLOR }}
          onClick={() => {
            props.gameButtonPressed(3);
          }}
          className="gameButton2x2"
          flat
        >
          {props.buttons[3].name}
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
