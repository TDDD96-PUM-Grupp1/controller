import React, { Component } from 'react';
import { Paper, Button } from 'react-md';
import PropTypes from 'prop-types';
import iconData from '../datamanagers/iconData';
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
  handleClick(id) {
    this.props.onIconSelect(iconData[id].id);
  }

  render() {
    return (
      <div>
        <Paper>
          <div className="fluidGridList">
            {iconData.map(tile => (
              <Button
                flat
                key={tile.id}
                onClick={() => {
                  this.handleClick(tile.id);
                }}
                className="iconListItemSize"
              >
                <img src={tile.img} alt="" id={tile.id} />
              </Button>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

IconList.propTypes = {
  onIconSelect: PropTypes.func.isRequired,
};

export default IconList;
