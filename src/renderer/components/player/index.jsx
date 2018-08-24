/* eslint-disable jsx-a11y/media-has-caption, react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import stateToProps from '../../utils/state-to-props';
import classes from './index.css';

const audioContext = new AudioContext();
const offlineContext = new OfflineAudioContext(2, 44100 * 40, 44100);

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
      // ipcRenderer.send('open-file', filepath);

      this.audio.src = `file://${filepath}`;
    }
  }

  play = () => {
    if (this.audio) {
      this.audio.play().catch(err => { throw err; });
    }
  };

  pause = () => {
    if (this.audio) {
      this.audio.pause();
    }
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
