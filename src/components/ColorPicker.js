import React, { Component } from 'react';
import { Button, Paper, TabsContainer, Tabs, Tab } from 'react-md';
import PropTypes from 'prop-types';
import Colors from '../datamanagers/Colors';
import './stylesheets/Component.css';

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

ColorPicker.propTypes = {
  onIconColorSelect: PropTypes.func.isRequired,
  onBackgroundColorSelect: PropTypes.func.isRequired,
};

export default ColorPicker;
