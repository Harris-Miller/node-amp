/* eslint-disable jsx-a11y/media-has-caption, react/no-did-update-set-state */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import stateToProps from '../../utils/state-to-props';
import classes from './index.css';

@connect(stateToProps('player'))
export default class Player extends Component {
  static propTypes = {
    player: ImmutablePropTypes.map.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      audioContext: new window.AudioContext(),
      audio: null
    };
  }

  componentDidUpdate(prevProps) {
    const path = this.props.player.get('path');

    if (prevProps.player.get('path') !== path) {
      const audio = new window.Audio(path);

      audio.addEventListener('loadstart', () => {
        this.sourceNode = this.state.audioContext.createMediaElementSource(audio);
      });

      this.setState({ audio });
    }
  }

  play = () => {
    this.state.audio.play().catch(err => { throw err; });
  };

  pause = () => {
    this.state.audio.pause().catch(err => { throw err; });
  };

  render() {
    const { player } = this.props;
    const filepath = player.get('filepath');
    const tags = player.get('tags');

    console.log(tags);

    if (filepath) {
      const trackInfo = tags
        ? <span>{tags.artist} - {tags.title}</span>
        : <span>{player.get('path')}</span>;

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
