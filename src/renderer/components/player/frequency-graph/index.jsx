import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { audioContext } from '../../../audio-context';

export default class FrequecyGraph extends Component {
  static propTypes = {
    controller: PropTypes.shape().isRequired
  };

  get WIDTH() {
    return this.canvas.width;
  }

  get HEIGHT() {
    return this.canvas.height;
  }

  constructor(props) {
    super(props);

    this.analyser = audioContext.createAnalyser();
    this.props.controller.source.connect(this.analyser);

    this.analyser.fftSize = 2048;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.dataArray);
  }

  componentDidMount() {
    this.canvas.width = (this.bufferLength / 4) + (this.bufferLength / 8);
    this.canvas.height = 100;

    this.canvasCtx = this.canvas.getContext('2d');
    this.draw();
  }

  draw = () => {
    requestAnimationFrame(this.draw);

    this.analyser.getByteFrequencyData(this.dataArray);

    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    const barWidth = 1;
    let barHeight;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i += 4) {
      barHeight = (this.dataArray[i] / 255) * 100;

      this.canvasCtx.fillStyle = `rgb(${barHeight + 200},50,50)`;
      this.canvasCtx.fillRect(x, this.HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 0.5;
    }
  };

  render() {
    return <canvas ref={node => { this.canvas = node; }} />;
  }
}
