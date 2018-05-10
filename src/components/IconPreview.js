import React from 'react';
import { Grid, Paper } from 'react-md';
import PropTypes from 'prop-types';
import iconData from '../datamanagers/iconData';

function IconPreview(props) {
  return (
    <Grid>
      <Paper
        className="iconPreviewWindow"
        style={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <div
          className="svgClass center"
          style={{
            backgroundColor: `${props.iconColor}`,
            WebkitMask: `url(${iconData[props.iconID].img})`,
            mask: `url(${iconData[props.iconID].img})`,
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
