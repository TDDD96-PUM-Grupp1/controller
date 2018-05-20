import React, { Component } from 'react';
import { Grid, Paper, LinearProgress } from 'react-md';
import PropTypes from 'prop-types';
import iconData from '../datamanagers/iconData';

class IconPreview extends Component {
  constructor(props) {
    super(props);
    this.deathTimer = undefined;
  }

  render() {
    let url;
    let currentBackgroundColor;
    let currentIconColor;

    if (this.props.iconID === -1) {
      url = '/icons/animal-skull.svg';
      currentBackgroundColor = '#000000'; // black background color
      currentIconColor = '#FFFFFF'; // white icon color
    } else {
      url = iconData[this.props.iconID].img;
      currentBackgroundColor = this.props.backgroundColor;
      currentIconColor = this.props.iconColor;
    }
    return (
      <Grid>
        <Paper
          className="iconPreviewWindow"
          style={{
            backgroundColor: currentBackgroundColor,
          }}
        >
          <LinearProgress
            className="vertical-progress center"
            id="death-timer"
            value={this.props.respawnTime}
            style={{
              backgroundColor: `${currentIconColor}`,
              WebkitMask: `url(${url})`,
              mask: `url(${url})`,
              width: '128',
              height: '128',
            }}
            progressStyle={value => ({ top: `${100 - value}%`, width: '100%' })}
          />
        </Paper>
      </Grid>
    );
  }
}

IconPreview.propTypes = {
  iconID: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  respawnTime: PropTypes.number.isRequired,
};

export default IconPreview;
