import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Range from '../../shared/range';
// import styles from './styles.css';

export default class Gain extends Component {
  static propTypes = {
    track: PropTypes.shape().isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      max: 0,
      current: 0
    };

    props.track.on('loadedmetadata', () => {
      this.setState({
        max: this.props.track.duration,
        current: this.props.track.currentTime
      });
    });

    this.followTime = setInterval(() => {
      this.setState({ current: this.props.track.currentTime });
    }, 100);
  }

  @autobind
  onRangeChange(newTrackPosition) {
    this.props.track.seek(newTrackPosition);
    this.forceUpdate(); // because of externally controlled value
  }

  render() {
    const { current, max } = this.state;
    return (
      <Range
        length="300px"
        value={current}
        max={max}
        onChange={this.onRangeChange}
      />
    );
  }
}
