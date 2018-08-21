import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { setCurrentTrack } from '../../actions/player';

const stateToProps = ({ player }) => ({ player });

@connect(stateToProps)
export default class Browser extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    paths: []
  };

  componentDidMount() {
    ipcRenderer.on('selected-directory', this.onSelectedDirectory);
  }

  componentWillUnmount() {
    ipcRenderer.off('selected-directory', this.onSelectedDirectory);
  }

  onSelectedDirectory = (event, paths) => {
    console.log(paths);
    this.setState({ paths });
  };

  setCurrentTrack = path => {
    this.props.dispatch(setCurrentTrack(path));
  };

  chooseFolder = () => {
    ipcRenderer.send('open-folder-dialog');
  };

  render() {
    const { paths } = this.state;
    return (
      <div>
        <button onClick={this.chooseFolder}>Watch folder</button>
        <div>
          {paths.map(path => <div key={path}><button onClick={() => this.setCurrentTrack(path)}>{path}</button></div>)}
        </div>
      </div>
    );
  }
}
