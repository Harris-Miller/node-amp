import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeMute from '@material-ui/icons/VolumeMute';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import stateToProps from '../../utils/state-to-props';
import styles from './styles.css';
import Track from '../../track';
import AudioController from '../../audio-controller';
import AlbumCover from './album-cover';
import Oscilloscope from './oscilloscope';
import FrequecyGraph from './frequency-graph';

@connect(stateToProps('player'))
export default class Player extends Component {
  static propTypes = {
    player: PropTypes.shape().isRequired
  };

  constructor(props) {
    super(props);

    this.track = new Track();
    this.audioController = new AudioController(this.track.track);
  }

  componentDidUpdate(prevProps) {
    const { filepath } = this.props.player;

    if (prevProps.player.filepath !== filepath) {
      this.track.load(`file://${filepath}`);
    }
  }

  get volume() {
    return this.track.muted ? 0 : this.track.volume;
  }

  setVolume = ({ target }) => {
    this.track.volume = target.value;
    this.forceUpdate(); // because of externally controlled value
  };

  play = () => {
    this.track.play().catch(err => { throw err; });
  };

  pause = () => {
    this.track.pause();
  };

  stop = () => {
    this.track.stop();
  };

  toggleMute = () => {
    this.track.isMuted ? this.track.unmute() : this.track.mute();
    this.forceUpdate(); // because of externally controlled value
  };

  render() {
    const { filepath, tags } = this.props.player;

    let trackInfo = null;

    if (filepath) {
      trackInfo = tags
        ? <span>{tags.artist} - {tags.title}</span>
        : <span>{filepath}</span>;
    }

    const volumeControl = this.track.isMuted
      ? <VolumeMute onClick={this.toggleMute} />
      : <VolumeUp onClick={this.toggleMute} />;

    return (
      <div className={styles.container}>
        <AlbumCover tags={tags} />
        <SkipPrevious />
        <PlayArrow onClick={this.play} />
        <Pause onClick={this.pause} />
        <Stop onClick={this.stop} />
        <SkipNext />
        {volumeControl}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          onChange={this.setVolume}
          value={this.volume}
          disabled={this.track.isMuted}
        />
        <span>{trackInfo}</span>
        <Oscilloscope controller={this.audioController} />
        <FrequecyGraph controller={this.audioController} />
      </div>
    );
  }
}
