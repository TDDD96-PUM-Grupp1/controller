import React from 'react';
import { Grid, Paper } from 'react-md';
import PropTypes from 'prop-types';

function setSVGColor(color) {
  document
    .querySelector('.svgClass')
    .getSVGDocument()
    .childNodes[0].childNodes[0].setAttribute('fill', color);
}

function IconPreview(props) {
  return (
    <Grid>
      <Paper
        className="iconPreviewWindow"
        style={{
          backgroundColor: props.backgroundColor
        }}
      >
        <object
          onLoad={() => {
            setSVGColor(props.iconColor);
          }}
          className="svgClass center"
          type="image/svg+xml"
          data={props.currentIcon}
          alt={props.currentIconID}
          width="128"
          height="128"
          style={{
            display: 'block',
            textAlign: 'center'
          }}
        >
          Image failed to load
        </object>
      </Paper>
    </Grid>
  );
}

/* eslint-disable react/forbid-prop-types */
IconPreview.propTypes = {
  currentIconID: PropTypes.number.isRequired,
  currentIcon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default IconPreview;
