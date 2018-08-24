import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import stateToProps from '../../utils/state-to-props';
import classes from './index.css';
import Audio from '../../audio';

@connect(stateToProps('player'))
export default class Player extends Component {
  static propTypes = {
    player: PropTypes.shape().isRequired
  };

  constructor(props) {
    super(props);

    this.audio = new Audio();
  }

  componentDidUpdate(prevProps) {
    const { filepath } = this.props.player;

    if (prevProps.player.filepath !== filepath) {
      this.audio.load(`file://${filepath}`);
      this.play();
    }
  }

  setVolume = ({ target }) => {
    this.audio.volume = target.value;
    this.forceUpdate(); // because of externally controlled value of this.audio.volume
  };

  play = () => {
    this.audio.play().catch(err => { throw err; });
  };

  pause = () => {
    this.audio.pause();
  };

  stop = () => {
    this.audio.stop();
  };

  render() {
    const { filepath, tags } = this.props.player;

    if (filepath) {
      const trackInfo = tags
        ? <span>{tags.artist} - {tags.title}</span>
        : <span>{filepath}</span>;

      const albumImage = tags && tags.image && tags.image.data
        ? `data:image/png;base64,${tags.image.data.toString('base64')}`
        : null;

      return (
        <div>
          <span>Loaded Song: {trackInfo}</span>
          <button onClick={this.play}>Play</button>
          <button onClick={this.pause}>Pause</button>
          <button onClick={this.stop}>Stop</button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            onChange={this.setVolume}
            value={this.audio.volume}
          />
          {albumImage && <img className={classes.albumCover} src={albumImage} alt="Album Cover" />}
        </div>
      );
    }

    return (
      <div>
        No Song selected
      </div>
    );
  }
}
