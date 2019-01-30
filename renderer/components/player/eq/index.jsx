import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Range from '../../shared/range';
import Track from '../../../track';
import classes from './styles.css';

export default class EQ extends Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  @autobind
  adjustFreqGain(i) {
    return value => {
      console.log(value);
      this.props.track.filters[i].gain.value = value;
      this.forceUpdate(); // because of externally controlled value
    };
  }

  @autobind
  resetFreqGain(i) {
    return () => {
      this.props.track.filters[i].gain.value = 0;
      this.forceUpdate(); // because of externally controlled value
    };
  }

  render() {
    const freqRanges = this.props.track.filters.map((filter, i) => {
      const input = (
        <Range
          length="50px"
          min={-8}
          max={8}
          step={0.1}
          onChange={this.adjustFreqGain(i)}
          onDoubleClick={this.resetFreqGain(i)}
          value={filter.gain.value}
          isVertical
        />
      );
      return (
        <div key={filter.frequency.value} className={classes.freq}>
          {input}
          <div>{filter.frequency.value}</div>
        </div>
      );
    });

    return (
      <div className={classes.container}>
        {freqRanges}
      </div>
    );
  }
}
