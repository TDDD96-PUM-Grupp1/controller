import React, { Component } from 'react';
import { Paper, Subheader, Button } from 'react-md';
import PropTypes from 'prop-types';
import iconData from './iconData';
import './stylesheets/Component.css';

/**
 * Component that shows selected icon and provides a scrollable bar
 * to pick between icons provided by iconData.js.
 */

class IconList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  /**
   * Sets the current icon given a user has clicked on a icon.
   */
  handleClick(e) {
    // Error check, for index in list.
    if (!e.target.id) {
      return;
    }

    this.props.onIconSelect(
      iconData[e.target.id].id,
      iconData[e.target.id].img,
      iconData[e.target.id].name
    );
  }

  render() {
    return (
      <div>
        <Paper>
          <Subheader primaryText="Sessions" />
          <div className="fluidGridList">
            {iconData.map(tile => (
              <Button flat key={tile.id} onClick={this.handleClick} className="iconListItemSize">
                <img src={tile.img} alt={tile.name} id={tile.id} />
              </Button>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
IconList.propTypes = {
  onIconSelect: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default IconList;
