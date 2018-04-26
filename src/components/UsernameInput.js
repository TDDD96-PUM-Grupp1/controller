import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import IconList from './IconList';
import NameRandomizer from './NameRandomizer';
import IconPreview from './IconPreview';
import iconData from './iconData';
import ColorPicker from './ColorPicker';

const styles = () => ({
  text: {
    width: '100%',
  },
  joinButton: {
    width: '100%',
    position: 'relative',
    marginTop: 5,
    left: 0,
  },

  backButton: {
    width: '49%',
    marginTop: 5,
    position: 'relative',
    left: 0,
  },
  randomButton: {
    width: '49%',
    marginTop: 5,
    marginLeft: '1%',
    position: 'relative',
  },
  buttonContainer: {
    width: '100%',
  },
});

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
class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.randomizer = new NameRandomizer();
    this.state = {
      username: this.props.username,
      currentIconID: 0,
      currentIcon: iconData[0].img,
      currentIconName: iconData[0].name,
      iconColor: '#000000',
      backgroundColor: '#FFFFFF',
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
      this.props.showGameWindow(
        this.randomizer.getRandomName(),
        this.state.currentIconID,
        this.state.backgroundColor,
        this.state.iconColor
      );
    } else {
      this.props.showGameWindow(
        this.state.username,
        this.state.currentIconID,
        this.state.backgroundColor,
        this.state.iconColor
      );
    }
  }

  handleIconSelect(iconID, icon, iconName) {
    this.setState({
      currentIconID: iconID,
      currentIcon: icon,
      currentIconName: iconName,
    });
  }

  /**
   * Set new state on input change.
   */
  handleInputChange(event) {
    this.setState({
      username: event.target.value,
    });
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
    this.setState({ username: this.randomizer.getRandomName() });
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
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.text}
          value={this.state.username}
          onChange={this.handleInputChange}
          placeholder="Enter a name..."
          label="Enter playername"
          fullWidth
        />
        <Button
          className={classes.joinButton}
          variant="raised"
          color="primary"
          onClick={this.handleSubmit}
        >
          Join
        </Button>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.backButton}
            variant="raised"
            color="primary"
            onClick={this.goBack}
          >
            Back
          </Button>
          <Button
            className={classes.randomButton}
            variant="raised"
            color="primary"
            onClick={this.randomizeName}
          >
            Random
          </Button>
        </div>
        <IconPreview
          currentIcon={this.state.currentIcon}
          currentIconName={this.state.currentIconName}
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

/* eslint-disable react/forbid-prop-types */
UsernameInput.propTypes = {
  showGameWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(UsernameInput);
