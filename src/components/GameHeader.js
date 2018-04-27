import React from 'react';
import { Grid, Cell, Button, Paper } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';

function GameHeader(props) {
  return (
    <Grid className="md-grid buttonContainer">
      <Cell size={6}>
        <Button className="button" primary raised onClick={props.goBack}>
          Leave
        </Button>
      </Cell>
      <Cell size={2}>
        <Paper>
          <div className="pingPaper">{`${props.ping} ms`}</div>
        </Paper>
      </Cell>
      <Cell size={6}>
        <Button className="button" primary raised onClick={props.calibrate}>
          Recallibrate Sensors
        </Button>
      </Cell>
    </Grid>
  );
}

GameHeader.propTypes = {
  calibrate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  ping: PropTypes.string.isRequired,
};

export default GameHeader;
