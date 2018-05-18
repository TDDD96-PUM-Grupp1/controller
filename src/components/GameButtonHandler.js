import React from 'react';
import PropTypes from 'prop-types';
import IconPreview from './IconPreview';

import { DrawOneButton, DrawTwoButtons, DrawThreeButtons, DrawFourButtons } from './GameButton';

function GameButtonHandler(props) {
  let renderHelper;
  const buttonAmount = props.buttons.length;
  if (buttonAmount === 0) {
    renderHelper = <div className="gameButtonContainer" />;
  } else if (buttonAmount === 1) {
    renderHelper = (
      <DrawOneButton
        gameButtonPressed={props.gameButtonPressed}
        buttons={props.buttons}
        activeButtons={props.activeButtons}
      />
    );
  } else if (buttonAmount === 2) {
    renderHelper = (
      <DrawTwoButtons
        gameButtonPressed={props.gameButtonPressed}
        buttons={props.buttons}
        activeButtons={props.activeButtons}
      />
    );
  } else if (buttonAmount === 3) {
    renderHelper = (
      <DrawThreeButtons
        gameButtonPressed={props.gameButtonPressed}
        buttons={props.buttons}
        activeButtons={props.activeButtons}
      />
    );
  } else if (buttonAmount === 4) {
    renderHelper = (
      <DrawFourButtons
        gameButtonPressed={props.gameButtonPressed}
        buttons={props.buttons}
        activeButtons={props.activeButtons}
      />
    );
  } else {
    throw Error('Invalid button amount requested');
  }
  return (
    <div className="gameButtonWrapper">
      {renderHelper}
      <div className="gameIcon">
        <IconPreview
          iconID={props.iconID}
          iconColor={props.iconColor}
          backgroundColor={props.backgroundColor}
          respawnTime={props.respawnTime}
        />
      </div>
    </div>
  );
}
/* eslint-disable react/forbid-prop-types */
GameButtonHandler.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
  iconID: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  activeButtons: PropTypes.array.isRequired,
  respawnTime: PropTypes.number.isRequired,
};
/* eslint-enable react/forbid-prop-types */
export default GameButtonHandler;
