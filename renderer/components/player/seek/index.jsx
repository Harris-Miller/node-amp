import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styles from './styles.css';

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

  get markerPosition() {
    const pixels = ((this.state.current / this.state.max) * 300) - 7.5; // 7.5 is half the width of the marker
    return `${pixels}px`;
  }

  get currentPosition() {
    const percent = (this.state.current / this.state.max) * 100;
    return `${percent}%`;
  }

  get seekLeftPosition() {
    return this.seekRef.current.offsetLeft;
  }

  get seekWidth() {
    return this.seekRef.current.clientWidth;
  }

  @autobind
  onSeekClick(e) {
    let relativePosition = e.clientX - this.seekLeftPosition;

    if (relativePosition < 0) relativePosition = 0;
    if (relativePosition > 300) relativePosition = 300;

    const percentOfTrack = relativePosition / 300;

    const newTrackPosition = percentOfTrack * this.state.max;

    this.props.track.seek(newTrackPosition);
    this.forceUpdate(); // because of externally controlled value
  }

  seekRef = React.createRef();

  render() {
    const { min } = this.state;
    return (
      <div ref={this.seekRef} className={styles.seek} data-min={min} onClick={this.onSeekClick}>
        <div className={styles.elapsed} style={{ width: this.currentPosition }} />
        <div className={styles.marker} style={{ left: this.markerPosition }} />
      </div>
    );
  }
}
