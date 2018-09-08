import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import stateToProps from '../../utils/state-to-props';
import styles from './styles.css';
import Track from '../../track';
import AudioController from '../../audio-controller';
import AlbumCover from './album-cover';
import Gain from './gain';
// import Oscilloscope from './oscilloscope';
import FrequecyGraph from './frequency-graph';
import Seek from './seek';

@connect(stateToProps('player'))
export default class Player extends Component {
  static propTypes = {
    player: PropTypes.shape().isRequired
  };

  constructor(props) {
    super(props);

    this.track = new Track();
    this.audioController = new AudioController(this.track.track);

    this.state = {
      currentTime: 0
    };

    this.followTime = setInterval(() => {
      this.setState({ currentTime: this.track.currentTime });
    }, 100);
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

  render() {
    const { filepath, tags } = this.props.player;

    let trackInfo = null;

    if (filepath) {
      trackInfo = tags
        ? <span>{tags.artist} - {tags.title}</span>
        : <span>{filepath}</span>;
    }

    const time = moment.unix(this.state.currentTime);
    const duration = moment.unix(isNaN(this.track.duration) ? 0 : this.track.duration);

    return (
      <div className={styles.container}>
        <span>{time.format('mm:ss')} - {duration.format('mm:ss')}</span>
        <AlbumCover tags={tags} />
        <SkipPrevious />
        <PlayArrow onClick={this.play} />
        <Pause onClick={this.pause} />
        <Stop onClick={this.stop} />
        <SkipNext />
        <Gain controller={this.audioController} />
        <span>{trackInfo}</span>
        <Seek track={this.track} />
        {/* <Oscilloscope controller={this.audioController} /> */}
        <FrequecyGraph controller={this.audioController} />
      </div>
    );
  }
}
