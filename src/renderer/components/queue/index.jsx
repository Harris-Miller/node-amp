import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import stateToProps from '../../utils/state-to-props';
import classes from './styles.css';

@connect(stateToProps('queue'))
class Queue extends Component {
  // static propTypes = {
  //   queue: PropTypes.shape().isRequired
  // };

  render() {
    return (
      <div className={classes.container}>Queue</div>
    );
  }
}

export default Queue;
