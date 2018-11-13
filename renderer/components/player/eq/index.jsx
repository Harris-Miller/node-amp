import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Track from '../../../track';
// import classes from './styles.css';

export default class EQ extends Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  adjustFreqGain(i, value) {
    this.props.track.filters[i].gain.value = value;
    this.forceUpdate(); // because of externally controlled value
  }

  resetFreqGain(i) {
    this.props.track.filters[i].gain.value = 0;
    this.forceUpdate(); // because of externally controlled value
  }

  render() {
    const freqRanges = this.props.track.filters.map((filter, i) => {
      const input = (
        <input
          type="range"
          min={-6}
          max={6}
          step={0.1}
          onChange={({ target }) => this.adjustFreqGain(i, target.value)}
          onDoubleClick={() => this.resetFreqGain(i)}
          value={filter.gain.value}
        />
      );
      return (<li key={filter.frequency.value}>{filter.frequency.value}: {input}</li>);
    });

    return (
      <div>
        <ul>
          {freqRanges}
        </ul>
      </div>
    );
  }
}
