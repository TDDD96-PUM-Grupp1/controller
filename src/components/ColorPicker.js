import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import GridList, { GridListTile } from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Colors from './Colors';

const styles = () => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    marginTop: 10,
  },

  alternatives: {
    textAlign: 'center',
    width: '100%',
  },
});

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorType: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  handleChange(e, value) {
    this.setState({
      colorType: value,
    });
  }

  handleColor(e) {
    if (this.state.colorType) {
      this.props.onIconColorSelect(Colors[e.target.id].hex);
    } else {
      this.props.onBackgroundColorSelect(Colors[e.target.id].hex);
    }
  }

  // asdsa
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper position="static">
          <Tabs
            fullwidth="true"
            indicatorColor="primary"
            value={this.state.colorType}
            onChange={this.handleChange}
            centered
          >
            <Tab label="Background color" />
            <Tab label="Icon color" />
          </Tabs>
          <GridList className={classes.gridList}>
            {Colors.map((tile, index) => (
              <GridListTile
                key={tile.name}
                style={{
                  height: 64,
                  width: 64,
                  textAlign: 'center',
                  marginTop: 10,
                }}
              >
                <Button
                  id={index}
                  variant="fab"
                  style={{ backgroundColor: tile.hex, width: 34, height: 34 }}
                  onClick={this.handleColor}
                >
                  <span />
                </Button>
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ColorPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onIconColorSelect: PropTypes.func.isRequired,
  onBackgroundColorSelect: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(ColorPicker);
