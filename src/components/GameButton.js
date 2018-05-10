import React from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';

const DISABLED_COLOR = '#AAAAAA';

export function DrawOneButton(props) {
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonSingle"
          raised
          disabled={!props.activeButtons[0]}
        >
          {props.buttons[0].name}
        </Button>
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
DrawOneButton.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  activeButtons: PropTypes.array.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export function DrawTwoButtons(props) {
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonLeft"
          raised
          disabled={!props.activeButtons[0]}
        >
          {props.buttons[0]}
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[1] ? props.buttons[1].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButtonRight"
          raised
          disabled={!props.activeButtons[1]}
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
  activeButtons: PropTypes.array.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export function DrawThreeButtons(props) {
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonLeft"
          raised
          disabled={!props.activeButtons[0]}
        >
          {props.buttons[0].name}
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[1] ? props.buttons[1].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButtonRightTop"
          raised
          disabled={!props.activeButtons[1]}
        >
          {props.buttons[1].name}
        </Button>
        <Button
          style={{
            backgroundColor: props.activeButtons[2] ? props.buttons[2].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(2);
          }}
          className="gameButtonRightBottom"
          raised
          disabled={!props.activeButtons[2]}
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
  activeButtons: PropTypes.array.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export function DrawFourButtons(props) {
  return (
    <div className="md-grid gameButtonContainer">
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[0] ? props.buttons[0].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(0);
          }}
          className="gameButtonLeftTop"
          raised
          disabled={!props.activeButtons[0]}
        >
          {props.buttons[0].name}
        </Button>
        <Button
          style={{
            backgroundColor: props.activeButtons[1] ? props.buttons[1].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(1);
          }}
          className="gameButtonLeftBottom"
          raised
          disabled={!props.activeButtons[1]}
        >
          {props.buttons[2].name}
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Button
          style={{
            backgroundColor: props.activeButtons[2] ? props.buttons[2].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(2);
          }}
          className="gameButtonRightTop"
          raised
          disabled={!props.activeButtons[2]}
        >
          {props.buttons[1].name}
        </Button>
        <Button
          style={{
            backgroundColor: props.activeButtons[3] ? props.buttons[3].color : DISABLED_COLOR,
          }}
          onClick={() => {
            props.gameButtonPressed(3);
          }}
          className="gameButtonRightBottom"
          raised
          disabled={!props.activeButtons[3]}
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
  activeButtons: PropTypes.array.isRequired,
};
/* eslint-enable react/forbid-prop-types */
