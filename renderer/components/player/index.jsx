import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import autobind from 'autobind-decorator';
import stateToProps from '../../utils/state-to-props';
import styles from './styles.css';
import Track from '../../track';
import AlbumCover from './album-cover';
import Gain from './gain';
import Oscilloscope from './oscilloscope';
import Controls from './controls';
import FrequecyGraph from './frequency-graph';
import Seek from './seek';
import EQ from './eq';
import { fileShape } from '../../types';

@connect(stateToProps('player'))
class Player extends Component {
  static propTypes = {
    player: PropTypes.shape(fileShape).isRequired
  };

  constructor(props) {
    super(props);

    this.track = new Track();

    this.state = {
      currentTime: 0,
      swap: false
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

  @autobind
  setVolume({ target }) {
    this.track.volume = target.value;
    this.forceUpdate(); // because of externally controlled value
  }

  @autobind
  swapVisual() {
    this.setState({ swap: !this.state.swap });
  }

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
        <div className={styles.item}>
          <AlbumCover tags={tags} />
          <div>
            <span>{trackInfo}</span>
          </div>
        </div>
        <div className={styles.controls}>
          <Controls track={this.track} />
          <div className={styles.seek}>
            <span>{time.format('mm:ss')}</span>
            <Seek track={this.track} />
            <span>{duration.format('mm:ss')}</span>
          </div>
        </div>
        <div>
          <Gain track={this.track} />
        </div>
        <div onClick={this.swapVisual}>
          {this.state.swap
            ? <Oscilloscope track={this.track} />
            : <FrequecyGraph track={this.track} />
          }
        </div>
        <EQ track={this.track} />
      </div>
    );
  }
}

export default Player;
