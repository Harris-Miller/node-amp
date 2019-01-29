import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import styles from './styles.css';

class Controls extends Component {
  static propTypes = {
    track: PropTypes.shape().isRequired
  };

  @autobind
  play() {
    this.props.track.play().catch(err => { throw err; });
  }

  @autobind
  pause() {
    this.props.track.pause();
  }

  @autobind
  stop() {
    this.props.track.stop();
  }

  render() {
    return (
      <div className={styles.controlsContainer}>
        <SkipPrevious />
        <PlayArrow onClick={this.play} />
        <Pause onClick={this.pause} />
        <Stop onClick={this.stop} />
        <SkipNext />
      </div>
    );
  }
}

export default Controls;
