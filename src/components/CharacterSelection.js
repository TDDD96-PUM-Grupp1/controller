import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Grid, Cell } from 'react-md';
import IconList from './IconList';
import { getRandomName, randomIntFromInterval } from '../datamanagers/Randomizer';
import IconPreview from './IconPreview';
import iconData from '../datamanagers/iconData';
import ColorPicker from './ColorPicker';
import Colors from '../datamanagers/Colors';
import './stylesheets/Component.css';

const MAX_NAME_LENGTH = 20;

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
      currentIcon: iconData[randomIconNumber].img,
      iconColor: Colors[randomIconColor].hex,
      backgroundColor: Colors[randomBackgroundColor].hex,
      errorNameLength: false,
      errorHelpText: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.randomizeName = this.randomizeName.bind(this);
    this.handleIconSelect = this.handleIconSelect.bind(this);
    this.handleIconColor = this.handleIconColor.bind(this);
    this.handleBackgroundColor = this.handleBackgroundColor.bind(this);
  }

  /**
   * Is called when the Join button is pressed, callbacks to enterGameWindow in App.js
   * with the argument of what is written in the text field.
   * If no username is specified the game generates a random one for the player.
   */
  handleSubmit() {
    if (this.state.username === '') {
      this.props.enterGame(
        getRandomName(),
        this.state.currentIconID,
        this.state.backgroundColor,
        this.state.iconColor
      );
    } else {
      this.props.enterGame(
        this.state.username,
        this.state.currentIconID,
        this.state.backgroundColor,
        this.state.iconColor
      );
    }
  }

  handleIconSelect(iconID, icon) {
    this.setState({
      currentIconID: iconID,
      currentIcon: icon,
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
          currentIcon={this.state.currentIcon}
          currentIconID={this.state.currentIconID}
          iconColor={this.state.iconColor}
          backgroundColor={this.state.backgroundColor}
        />
        <IconList onIconSelect={this.handleIconSelect} />
        <ColorPicker
          onIconColorSelect={this.handleIconColor}
          onBackgroundColorSelect={this.handleBackgroundColor}
        />
      </div>
    );
  }
}

CharacterSelection.propTypes = {
  enterGame: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default CharacterSelection;
