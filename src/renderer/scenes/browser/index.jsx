import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { setCurrentTrack } from '../../actions/player';
import stateToProps from '../../utils/state-to-props';

@connect(stateToProps('player', 'browser'))
export default class Browser extends Component {
  static propTypes = {
    // player: ImmutablePropTypes.map.isRequired,
    browser: ImmutablePropTypes.map.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  setCurrentTrack = file => {
    this.props.dispatch(setCurrentTrack(file));
  };

  chooseFolder = () => {
    ipcRenderer.send('open-folder-dialog');
  };

  render() {
    const { browser } = this.props;
    const files = browser.get('files');

    return (
      <div>
        <div>
          {files.map(file => {
            const path = file.get('filepath');
            return (
              <div key={path}><button onClick={() => this.setCurrentTrack(file)}>{path}</button></div>
            );
          })}
        </div>
      </div>
    );
  }
}
