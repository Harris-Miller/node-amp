import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Track from '../../../track';
import { audioContext } from '../../../audio-context';

export default class Oscilloscope extends Component {
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
    this.analyser.getByteTimeDomainData(this.dataArray);
  }

  componentDidMount() {
    // this.canvas.width = 300;
    // this.canvas.height = 100;

    this.canvasCtx = this.canvas.getContext('2d');
    this.draw();
  }

  draw = () => {
    requestAnimationFrame(this.draw);

    this.analyser.getByteTimeDomainData(this.dataArray);

    this.canvasCtx.fillStyle = 'rgb(230, 230, 230)';
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    this.canvasCtx.beginPath();

    const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = (v * this.canvas.height) / 2;

      if (i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasCtx.stroke();
  };

  render() {
    return <canvas ref={node => { this.canvas = node; }} />;
  }
}
