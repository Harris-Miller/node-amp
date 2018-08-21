/* eslint-disable jsx-a11y/media-has-caption, react/no-did-update-set-state */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import id3Tag from 'node-id3';

const stateToProps = ({ player }) => ({ player });

@connect(stateToProps)
export default class Player extends Component {
  static propTypes = {
    player: ImmutablePropTypes.map.isRequired
  };

  constructor(props) {
    super(props);

    const path = props.player.get('path');

    this.state = {};

    if (path !== '') {
      const tags = this.readTags(path);
      if (tags) {
        this.state.tags = tags;
      }
    }
  }

  componentDidUpdate(prevProps) {
    const path = this.props.player.get('path');

    if (prevProps.player.get('path') !== path) {
      this.setState({ tags: this.readTags(path) });
    }
  }

  readTags = path => {
    try {
      return id3Tag.read(path);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  render() {
    const { player } = this.props;
    const { tags } = this.state;

    if (player.has('path')) {
      const trackInfo = tags
        ? <span>{tags.artist} - {tags.title}</span>
        : <span>{player.get('path')}</span>;
      return (
        <div>
          <div>Loaded Song: {trackInfo}</div>
          <button>Play</button>
          <button>Pause</button>
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
