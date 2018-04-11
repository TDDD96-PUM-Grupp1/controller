import React, { Component } from 'react';
import GridList, { GridListTile } from 'material-ui/GridList';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Subheader from 'material-ui/List/ListSubheader';
import PropTypes from 'prop-types';
import iconData from './iconData';

const styles = () => ({
  root: {
    flexGrow: 1
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  currentIcon: {
    width: 200,
    textAlign: 'center',
    margin: 'auto'
  },
  currentItem: {
    width: '100%'
  },
  alternatives: {
    width: 360
  },
  imageSize: {
    width: '65%',
    height: '65%',
    margin: 'auto'
  }
});

class IconList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: iconData[0].img,
      currentImageName: iconData[0].name
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.id === undefined) {
      return;
    }

    this.setState({
      currentImage: iconData[e.target.id].img,
      currentImageName: iconData[e.target.id].name
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.currentIcon}>
          <Grid item className={classes.currentItem}>
            <Paper>
              <Subheader> {this.state.currentImageName} </Subheader>
              <Grid item className={classes.imageSize}>
                <img src={this.state.currentImage} alt={this.state.currentImageName} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Paper className={classes.alternatives}>
          <Subheader> Icons </Subheader>
          <GridList className={classes.gridList}>
            {iconData.map(tile => (
              <GridListTile
                style={{
                  height: 64,
                  width: 64
                }}
                onClick={this.handleClick}
              >
                <img src={tile.img} alt={tile.name} id={tile.id} />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
IconList.propTypes = {
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(IconList);
