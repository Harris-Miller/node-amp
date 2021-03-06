import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Track from '../../../track';
import { audioContext } from '../../../audio-context';
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
    this.WIDTH = 320; // 64 * 5, 65 bars, 5px per bar
    this.HEIGHT = 100;

    this.createBars();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
  }

  @autobind
  createBars() {
    this.frameId = requestAnimationFrame(this.createBars);

    this.analyser.getByteFrequencyData(this.dataArray);

    const barWidth = 4;

    const bars = [];

    for (let i = 0; i < this.bufferLength; i += 16) { // we don't need to read every single one, multipes of 16 is fine
      const barHeight = (this.dataArray[i] / 255) * 100; // height is a range of 0 to 100

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
