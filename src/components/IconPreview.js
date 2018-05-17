import React from 'react';
import { Grid, Paper } from 'react-md';
import PropTypes from 'prop-types';
import iconData from '../datamanagers/iconData';

function IconPreview(props) {
  let url;
  let currentBackgroundColor;
  let currentIconColor;
  if (props.iconID === -1) {
    url = '/icons/animal-skull.svg';
    currentBackgroundColor = '#000000'; // black background color
    currentIconColor = '#FFFFFF'; // white icon color
  } else {
    url = iconData[props.iconID].img;
    currentBackgroundColor = props.backgroundColor;
    currentIconColor = props.iconColor;
  }
  return (
    <Grid>
      <Paper
        className="iconPreviewWindow"
        style={{
          backgroundColor: currentBackgroundColor,
        }}
      >
        <div
          className="svgClass center"
          style={{
            backgroundColor: `${currentIconColor}`,
            WebkitMask: `url(${url})`,
            mask: `url(${url})`,
            width: '128',
            height: '128',
          }}
        />
      </Paper>
    </Grid>
  );
}

IconPreview.propTypes = {
  iconID: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default IconPreview;
