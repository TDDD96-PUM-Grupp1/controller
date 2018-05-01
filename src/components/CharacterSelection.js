import React, { Component } from 'react';
import deepstream from 'deepstream.io-client-js';
import PropTypes from 'prop-types';
import { Button, TextField, Grid, Cell } from 'react-md';
import MDSpinner from 'react-md-spinner';
import IconList from './IconList';
import { getRandomName, randomIntFromInterval } from '../datamanagers/Randomizer';
import IconPreview from './IconPreview';
import iconData from '../datamanagers/iconData';
import ColorPicker from './ColorPicker';
import Colors from '../datamanagers/Colors';
import './stylesheets/Component.css';

const MAX_NAME_LENGTH = 21;
const STATE_OK = 0;
const STATE_VALIDATING = 1;
const STATE_ERROR = 2;
/**
 * Method for setting a color on a SVG icon.
 */
function setSVGColor(color) {
  document
    .querySelector('.svgClass')
    .getSVGDocument()
    .childNodes[0].childNodes[0].setAttribute('fill', color);
}

/**
 * The class responsible to handle the username input through a text field
 * and a button to send it to the server.
 */
class CharacterSelection extends Component {
  constructor(props) {
    super(props);

    const randomIconNumber = randomIntFromInterval(iconData.length);
    const randomIconColor = randomIntFromInterval(Colors.length);
    let randomBackgroundColor = randomIntFromInterval(Colors.length);

    while (randomIconColor === randomBackgroundColor) {
      randomBackgroundColor = randomIntFromInterval(Colors.length);
    }

    this.state = {
      username: getRandomName(),
      currentIconID: iconData[randomIconNumber].id,
      iconColor: Colors[randomIconColor].hex,
      backgroundColor: Colors[randomBackgroundColor].hex,
      errorNameLength: false,
      errorHelpText: '',
      state: STATE_OK,
      stateError: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.randomizeName = this.randomizeName.bind(this);
    this.handleIconSelect = this.handleIconSelect.bind(this);
    this.handleIconColor = this.handleIconColor.bind(this);
    this.handleBackgroundColor = this.handleBackgroundColor.bind(this);
    this.onJoined = this.onJoined.bind(this);
  }

  onJoined(err) {
    if (!err) {
      this.props.enterGame(
        this.state.username,
        this.state.currentIconID,
        this.state.backgroundColor,
        this.state.iconColor
      );
    } else {
      let error = err;
      if (err === deepstream.CONSTANTS.EVENT.NO_RPC_PROVIDER) {
        error = 'UI is no longer online.';
      }
      this.setState({ state: STATE_ERROR, stateError: error });
    }
  }

  /**
   * Is called when the Join button is pressed, callbacks to enterGameWindow in App.js
   * with the argument of what is written in the text field.
   * If no username is specified the game generates a random one for the player.
   */
  handleSubmit() {
    this.setState({ state: STATE_VALIDATING });
    let { username } = this.state;
    if (username === '') {
      username = getRandomName();
      this.setState({ username });
    }
    this.props.communication.joinInstance(
      this.props.instanceName,
      username,
      this.state.currentIconID,
      this.state.backgroundColor,
      this.state.iconColor,
      this.onJoined
    );
  }

  handleIconSelect(iconID) {
    this.setState({
      currentIconID: iconID,
    });
  }

  /**
   * Set new state on input change.
   */
  handleInputChange(value) {
    this.setState({
      username: value,
    });
    if (value.length > MAX_NAME_LENGTH) {
      this.setState({
        errorNameLength: true,
        errorHelpText: 'shorter',
      });
    } else if (value.length === 0) {
      this.setState({
        errorNameLength: true,
        errorHelpText: 'longer',
      });
    } else {
      this.setState({
        errorNameLength: false,
      });
    }
  }

  /**
   * Leaves this window and saves the username
   */
  goBack() {
    this.props.goBack(this.state.username);
  }

  /**
   * Changes the current username to a random one
   */
  randomizeName() {
    this.setState({ username: getRandomName() });
  }

  handleIconColor(color) {
    this.setState({
      iconColor: color,
    });
    setSVGColor(color);
  }

  handleBackgroundColor(color) {
    this.setState({
      backgroundColor: color,
    });
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.username}
          onChange={this.handleInputChange}
          placeholder="Enter a name..."
          label="Enter playername"
          fullWidth
          error={this.state.errorNameLength}
          errorText={`${this.state.username.length}/${MAX_NAME_LENGTH} Please enter a ${
            this.state.errorHelpText
          } name!`}
          helpText={`${this.state.username.length}/${MAX_NAME_LENGTH}`}
          id="2" // required by react-md
        />
        <Grid className="md-grid buttonContainer">
          <Cell size={4}>
            <Button className="button" raised primary onClick={this.goBack}>
              Back
            </Button>
          </Cell>
          <Cell size={4}>
            <Button className="button" raised primary onClick={this.randomizeName}>
              Random
            </Button>
          </Cell>
          <Cell size={4}>
            <Button
              disabled={this.state.errorNameLength}
              className="button"
              raised
              primary
              onClick={this.handleSubmit}
            >
              Join
            </Button>
          </Cell>
        </Grid>
        <IconPreview
          iconID={this.state.currentIconID}
          iconColor={this.state.iconColor}
          backgroundColor={this.state.backgroundColor}
        />
        <IconList onIconSelect={this.handleIconSelect} />
        <ColorPicker
          onIconColorSelect={this.handleIconColor}
          onBackgroundColorSelect={this.handleBackgroundColor}
        />
        {(() => {
          switch (this.state.state) {
            case STATE_VALIDATING:
              return (
                <div className="characterSpinner">
                  <MDSpinner singleColor="#2196F3" size="100px" />
                </div>
              );
            case STATE_ERROR:
              return <div className="characterError">{this.state.stateError}</div>;
            case STATE_OK:
              return <div />;
            default:
              return <div className="characterError">Invalid state: {this.state.state}</div>;
          }
        })()}
      </div>
    );
  }
}

CharacterSelection.propTypes = {
  enterGame: PropTypes.func.isRequired,
  // eslint-disable-next-line
  communication: PropTypes.object.isRequired,
  instanceName: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default CharacterSelection;
