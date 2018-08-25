import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import stateToProps from '../../utils/state-to-props';
import style from './index.css';
import Track from '../../track';
import AudioController from '../../audio-controller';

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

  setVolume = ({ target }) => {
    this.track.volume = target.value;
    this.forceUpdate(); // because of externally controlled value of this.track.volume
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

    const albumImage = tags && tags.image && tags.image.data
      ? `data:image/png;base64,${tags.image.data.toString('base64')}`
      : null;

    return (
      <div className={style.container}>
        <PlayArrow onClick={this.play} />
        <Pause onClick={this.pause} />
        <Stop onClick={this.stop} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          onChange={this.setVolume}
          value={this.track.volume}
        />
        <span>{trackInfo}</span>
        {albumImage && <img className={style.albumCover} src={albumImage} alt="Album Cover" />}
      </div>
    );
  }
}
