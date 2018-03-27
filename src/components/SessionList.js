import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { withStyles } from 'material-ui/styles';
import Session from './Session';

const styles = theme => ({
  header: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.common.white
  }
});

/**
 * eg finding new sessions and removing old
 * The list the sessions live within, responsible for updating the list
 */
class SessionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { instances: [] };
    this.state = { instances: this.props.testSessions };
  }

  componentDidMount() {
    this.updateList();
  }

  /**
   * Update the list of active instances
   */
  updateList() {
    this.props.requestInstances((err, result) => {
      if (!err) {
        this.setState({ instances: result });
      } else {
        // TODO: handle error
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <List
        component="nav"
        subheader={
          <ListSubheader className={classes.header} color="primary" component="div">
            Session List
          </ListSubheader>
        }
      >
        {this.state.instances.map(session => (
          <div key={session.name}>
            <Session sessionObj={session} enterSessionWindow={this.props.enterSessionWindow} />
          </div>
        ))}
      </List>
    );
  }
}
/* eslint-disable react/forbid-prop-types */
SessionList.propTypes = {
  testSessions: PropTypes.arrayOf(PropTypes.object),
  requestInstances: PropTypes.func.isRequired,
  enterSessionWindow: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(SessionList);
