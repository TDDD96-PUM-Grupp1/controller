import React, { Component } from 'react';
import deepstream from 'deepstream.io-client-js';
import PropTypes from 'prop-types';
import { Button, TextField, Grid, Cell, DialogContainer } from 'react-md';
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
const TIME_TIMEOUT = 5000;
/**
 * The class responsible to handle the username input through a text field
 * and a button to send it to the server.
 */
class CharacterSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      currentIconID: this.props.iconID,
      iconColor: this.props.iconColor,
      backgroundColor: this.props.backgroundColor,
      errorNameLength: false,
      errorHelpText: '',
      state: STATE_OK,
      stateError: '',
      showDialog: false,
      gamemodeInfo: [],
    };
    this.timeout = undefined;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.randomize = this.randomize.bind(this);
    this.handleIconSelect = this.handleIconSelect.bind(this);
    this.handleIconColor = this.handleIconColor.bind(this);
    this.handleBackgroundColor = this.handleBackgroundColor.bind(this);
    this.onJoined = this.onJoined.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentWillMount() {
    // Generate random name, icon and colors if they do not exist
    if (this.props.iconID === -1) {
      this.randomize();
    }
    this.props.communication.getGamemodeInfo(this.props.instanceName, (err, data) => {
      if (err) {
        let error = err;
        if (error === deepstream.CONSTANTS.EVENT.NO_RPC_PROVIDER) {
          error = 'UI is no longer online.';
        }
        this.setState({ state: STATE_ERROR, stateError: error });
      } else {
        this.setState({
          gamemodeInfo: data,
        });
      }
    });
  }

  onJoined(err) {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    if (!err) {
      this.props.enterGame(
        this.state.username,
        this.state.currentIconID,
        this.state.backgroundColor,
        this.state.iconColor
      );
    } else {
      let error = err;
      if (error === deepstream.CONSTANTS.EVENT.NO_RPC_PROVIDER) {
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
    this.timeout = setTimeout(() => {
      this.setState({ state: STATE_ERROR, stateError: 'Connection timed out' });
    }, TIME_TIMEOUT);
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
   * Leave this window and store the current presets in App.js
   */
  goBack() {
    this.props.updatePlayerInfo(
      this.state.username,
      this.state.currentIconID,
      this.state.backgroundColor,
      this.state.iconColor
    );

    this.props.goBack();
  }

  /**
   * Randomizes the username, icon, icon color and background color and send the new data to App.js
   */
  randomize() {
    const randomIconNumber = randomIntFromInterval(iconData.length);
    const randomIconColor = randomIntFromInterval(Colors.length);
    const username = getRandomName();
    let randomBackgroundColor = randomIntFromInterval(Colors.length);

    while (randomIconColor === randomBackgroundColor) {
      randomBackgroundColor = randomIntFromInterval(Colors.length);
    }

    const iconColor = Colors[randomIconColor].hex;
    const backgroundColor = Colors[randomBackgroundColor].hex;
    const currentIconID = iconData[randomIconNumber].id;

    this.setState({
      username,
      iconColor,
      backgroundColor,
      currentIconID,
    });
  }

  handleIconColor(color) {
    this.setState({
      iconColor: color,
    });
  }

  handleBackgroundColor(color) {
    this.setState({
      backgroundColor: color,
    });
  }

  show() {
    this.setState({ showDialog: true });
  }

  hide() {
    this.setState({ showDialog: false });
  }

  render() {
    const actions = [];
    actions.push({ children: 'Back', onClick: this.hide });

    return (
      <div>
        <div className="top-container">
          <TextField
            className="top-container-item"
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Enter a name..."
            label="Enter playername"
            error={this.state.errorNameLength}
            errorText={`${this.state.username.length}/${MAX_NAME_LENGTH} Please enter a ${
              this.state.errorHelpText
            } name!`}
            helpText={`${this.state.username.length}/${MAX_NAME_LENGTH}`}
            style={{
              width: '75%',
            }}
            id="2" // required by react-md
          />
          <div className="top-container-item">
            <Button floating onClick={this.show}>
              info
            </Button>
          </div>
        </div>
        <Grid className="md-grid buttonContainer">
          <Cell size={4}>
            <Button className="button" raised primary onClick={this.goBack}>
              Back
            </Button>
          </Cell>
          <Cell size={4}>
            <Button className="button" raised primary onClick={this.randomize}>
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

        <DialogContainer
          id="simple-action-dialog"
          visible={this.state.showDialog}
          title={this.props.gamemode}
          onHide={this.hide}
          aria-describedby="game-info-text"
          actions={actions}
          disableScrollLocking
          style={{
            zIndex: '2000',
          }}
          dialogStyle={{
            width: '70%',
            overflow: 'auto',
          }}
        >
          {this.state.gamemodeInfo.map((content, index) => {
            if (index === 0) {
              return (
                <p className="game-info-text" key={content}>
                  Tilt your device to steer your player! If you are playing from a computer, steer
                  with the arrowkeys or W, A, S, D.<br />
                  <br /> Gamemode description: {content}
                </p>
              );
            }
            return (
              <p className="game-info-text" key={content}>
                {content}
              </p>
            );
          })}
        </DialogContainer>
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
  username: PropTypes.string.isRequired,
  iconID: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  updatePlayerInfo: PropTypes.func.isRequired,
  gamemode: PropTypes.string.isRequired,
};

export default CharacterSelection;
