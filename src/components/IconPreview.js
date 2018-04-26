import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/List/ListSubheader';
import PropTypes from 'prop-types';

const styles = () => ({
  currentIcon: {
    marginTop: 5,
    width: 200,
    textAlign: 'center',
    margin: 'auto',
  },
  currentItem: {
    width: '100%',
  },
  imageSize: {
    width: '65%',
    height: '65%',
    margin: 'auto',
  },
});

function setSVGColor(color) {
  document
    .querySelector('.svgClass')
    .getSVGDocument()
    .childNodes[0].childNodes[0].setAttribute('fill', color);
}

function IconPreview(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.currentIcon}>
      <Grid item className={classes.currentItem}>
        <Paper
          style={{
            backgroundColor: props.backgroundColor,
          }}
        >
          <Subheader> {props.currentIconName} </Subheader>
          <Grid item className={classes.imageSize}>
            <object
              onLoad={() => {
                setSVGColor(props.iconColor);
              }}
              className="svgClass"
              type="image/svg+xml"
              data={props.currentIcon}
              alt={props.currentIconName}
              width="128"
              height="128"
            >
              Image failed to load
            </object>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

/* eslint-disable react/forbid-prop-types */
IconPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  currentIconName: PropTypes.string.isRequired,
  currentIcon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(IconPreview);
