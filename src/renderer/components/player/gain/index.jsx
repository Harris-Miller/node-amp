import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeMute from '@material-ui/icons/VolumeMute';
import { audioContext } from '../../../audio-context';

export default class Gain extends Component {
  static propTypes = {
    controller: PropTypes.shape().isRequired
  };

  constructor(props) {
    super(props);

    this.gain = audioContext.createGain();
    this.props.controller.source.connect(this.gain);
    this.gain.connect(audioContext.destination);

    this.state = {
      value: 1,
      isMuted: false
    };

    this.gain.gain.value = this.state.value;
  }

  setVolume = ({ target }) => {
    this.setState({ value: target.value });
  };

  toggleMute = () => {
    this.setState(state => ({ isMuted: !state.isMuted }));
  };

  render() {
    const volumeControl = this.state.isMuted
      ? <VolumeMute onClick={this.toggleMute} />
      : <VolumeUp onClick={this.toggleMute} />;

    this.gain.gain.value = this.state.isMuted ? 0 : this.state.value;

    return (
      <span>
        {volumeControl}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          onChange={this.setVolume}
          value={this.gain.gain.value}
          disabled={this.state.isMuted}
        />
      </span>
    );
  }
}
