import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { setCurrentTrack } from '../../actions/player';
import stateToProps from '../../utils/state-to-props';
import classes from './index.css';

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

  setCurrentTrack = file => {
    this.props.dispatch(setCurrentTrack(file));
  };

  setArtist = artist => {
    this.setState({ artist });
  };

  chooseFolder = () => {
    ipcRenderer.send('open-folder-dialog');
  };

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
          {artists.map(artist => <div key={artist}><button onClick={() => this.setArtist(artist)}>{artist}</button></div>)}
        </div>
        <div className={classes.half}>
          {artistTracks && artistTracks.map(track => <div key={track.tags.title || track.filepath}><button onClick={() => this.setCurrentTrack(track)}>{track.tags.title || track.filepath}</button></div>)}
        </div>
      </div>
    );
  }
}
