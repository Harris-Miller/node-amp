import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeMute from '@material-ui/icons/VolumeMute';
import Track from '../../../track';
import { bind } from '../../../utils/decorators';

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

  @bind
  setVolume({ target }) {
    this.setState({ value: target.value });
  }

  @bind
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
      <span>
        {volumeControl}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          onChange={this.setVolume}
          value={track.gain.value}
          disabled={isMuted}
        />
      </span>
    );
  }
}
