import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Track from '../../../track';
import { audioContext } from '../../../audio-context';
import { bind } from '../../../utils/decorators';
import classes from './style.css';

export default class FrequecyGraph extends Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  constructor(props) {
    super(props);

    this.analyser = audioContext.createAnalyser();
    this.props.track.source.connect(this.analyser);

    this.analyser.fftSize = 2048;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.dataArray);

    this.state = { bars: [] };
  }

  componentDidMount() {
    this.WIDTH = (this.bufferLength / 4) + (this.bufferLength / 16);
    this.HEIGHT = 100;

    this.createBars();
  }

  @bind
  createBars() {
    requestAnimationFrame(this.createBars);

    this.analyser.getByteFrequencyData(this.dataArray);

    const barWidth = 4;

    const bars = [];

    for (let i = 0; i < this.bufferLength; i += 16) {
      const barHeight = (this.dataArray[i] / 255) * 100;

      bars.push(<div key={i} style={{ backgroundColor: `rgb(50,${barHeight + 150},50)`, height: `${barHeight}px`, width: `${barWidth}px`, marginRight: 1 }} />);
    }

    this.setState({ bars });
  }

  render() {
    return (
      <div className={classes.graph} style={{ height: `${this.HEIGHT}px`, width: `${this.WIDTH}px` }}>
        {this.state.bars}
      </div>
    );
  }
}
