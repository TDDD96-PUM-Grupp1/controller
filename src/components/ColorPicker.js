import React, { Component } from 'react';
import { Button, Paper, TabsContainer, Tabs, Tab } from 'react-md';
import PropTypes from 'prop-types';
import Colors from './Colors';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorType: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleChange(index) {
    this.setState({
      colorType: index,
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
    return (
      <div>
        <Paper className="colorPicker">
          <TabsContainer onTabChange={this.handleChange}>
            <Tabs mobile tabId="simple-tab">
              <Tab className="tabClass" label="Background Color" />
              <Tab className="tabClass" label="Icon Color" />
            </Tabs>
          </TabsContainer>
          <div className="fluidGridList">
            {Colors.map((tile, index) => (
              <div className="fluidGridItem" key={tile.name}>
                <Button
                  className="colorListItemSize"
                  id={index}
                  flat
                  style={{ backgroundColor: tile.hex }}
                  onClick={this.handleColor}
                />
              </div>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ColorPicker.propTypes = {
  onIconColorSelect: PropTypes.func.isRequired,
  onBackgroundColorSelect: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default ColorPicker;
