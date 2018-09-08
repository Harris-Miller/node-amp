import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Gain extends Component {
  static propTypes = {
    track: PropTypes.shape().isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0,
      current: 0
    };

    props.track.on('loadedmetadata', () => {
      this.setState({
        min: 0,
        max: this.props.track.duration,
        current: this.props.track.currentTime
      });
    });

    this.followTime = setInterval(() => {
      this.setState({ current: this.props.track.currentTime });
    }, 100);
  }

  setCurrentTime = ({ target }) => {
    this.props.track.seek(target.value);
    this.forceUpdate(); // because of externally controlled value
  };

  render() {
    return (
      <span>
        <input
          type="range"
          min={this.state.min}
          max={this.state.max}
          step={1}
          value={this.state.current}
          onChange={this.setCurrentTime}
        />
      </span>
    );
  }
}
