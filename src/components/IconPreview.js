import React from 'react';
import { Grid, Paper } from 'react-md';
import PropTypes from 'prop-types';
import iconData from '../datamanagers/iconData';

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
          backgroundColor: props.backgroundColor,
        }}
      >
        <object
          onLoad={() => {
            setSVGColor(props.iconColor);
          }}
          className="svgClass center"
          type="image/svg+xml"
          data={iconData[props.iconID].img}
          alt={props.iconID}
          width="128"
          height="128"
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          Image failed to load
        </object>
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
