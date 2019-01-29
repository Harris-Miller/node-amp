import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeMute from '@material-ui/icons/VolumeMute';
import autobind from 'autobind-decorator';
import Track from '../../../track';
import Range from '../../shared/range';
import styles from './styles.css';

export default class Gain extends Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: 0.5,
      isMuted: false
    };

    this.props.track.gain.value = this.state.value;
  }

  @autobind
  setVolume(percent) {
    this.setState({ value: percent / 100 });
  }

  @autobind
  toggleMute() {
    this.setState(state => ({ isMuted: !state.isMuted }));
  }

  render() {
    const { track } = this.props;
    const { isMuted, value } = this.state;

    const volumeControl = isMuted
      ? <VolumeMute onClick={this.toggleMute} />
      : <VolumeUp onClick={this.toggleMute} />;

    track.gain.value = isMuted ? 0 : value;

    return (
      <div className={styles.gain} >
        {volumeControl}
        <Range
          style={{ width: '100px' }}
          max={1}
          value={track.gain.value}
          onChange={this.setVolume}
          disabled={isMuted}
        />
      </div>
    );
  }
}
