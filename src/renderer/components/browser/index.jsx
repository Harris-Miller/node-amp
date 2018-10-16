import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { setCurrentTrack } from '../../actions/player';
import stateToProps from '../../utils/state-to-props';
import ActionableTextRow from '../shared/actionable-text-row';
import classes from './styles.css';
import { bind } from '../../utils/decorators';

function sortFileByTitle(a, b) {
  const aTitle = a.tags.title || a.filepath;
  const bTitle = b.tags.title || a.filepath;

  if (aTitle < bTitle) { return -1; }
  if (aTitle > bTitle) { return 1; }
  if (aTitle === bTitle) { return 0; }
}

@connect(stateToProps('player', 'browser'))
export default class Browser extends Component {
  static propTypes = {
    browser: ImmutablePropTypes.map.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    artist: null
  };

  @bind
  setCurrentTrack(file) {
    this.props.dispatch(setCurrentTrack(file));
  }

  @bind
  setArtist(artist) {
    this.setState({ artist });
  }

  @bind
  chooseFolder() {
    ipcRenderer.send('open-folder-dialog');
  }

  render() {
    const { browser } = this.props;
    const files = browser.get('files');

    const artists = files.map(file => file.tags.artist || ' { no artist } ').toSet().sort();

    const artistTracks = this.state.artist
      ? files.filter(file => (this.state.artist === file.tags.artist) || ((this.state.artist === ' { no artist } ') && !file.tags.artist)).sort(sortFileByTitle)
      : null;

    return (
      <div className={classes.container}>
        <div className={classes.half}>
          {artists.map(artist => <ActionableTextRow key={artist} onClick={() => this.setArtist(artist)}>{artist}</ActionableTextRow>)}
        </div>
        <div className={classes.half}>
          {artistTracks && artistTracks.map(track => <ActionableTextRow key={track.tags.title || track.filepath} onClick={() => this.setCurrentTrack(track)}>{track.tags.title || track.filepath}</ActionableTextRow>)}
        </div>
      </div>
    );
  }
}
