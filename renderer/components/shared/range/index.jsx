/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import rangeInclusive from 'range-inclusive';
import styles from './styles.css';

class Range extends Component {
  static propTypes = {
    length: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    isVertical: PropTypes.bool
  };

  static defaultProps = {
    length: '100px',
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    onChange: null,
    disabled: false,
    isVertical: false
  };

  static getDerivedStateFromProps(props) {
    return { marks: rangeInclusive(props.min, props.max, props.step) };
  }

  state = {
    holding: false,
    mouseCurrent: 0
  };

  get rangeLength() {
    return parseFloat(this.props.length);
  }

  get physicalStep() {
    return this.rangeLength / this.state.marks.length;
  }

  get physicalMarks() {
    if (!this.ref.current) {
      return [0];
    }

    return rangeInclusive(0, this.rangeLength, this.physicalStep);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    this.ref.current.addEventListener('mousedown', this.onMouseDown);
    this.ref.current.addEventListener('doubleclick', this.onDoubleClick);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener(this.onMouseMove);
    this.ref.current.removeEventListener(this.onMouseDown);
    this.ref.current.removeEventListener('doubleclick', this.onDoubleClick);
    document.removeEventListener(this.onMouseUp);
  }

  @autobind
  onMouseMove(e) {
    if (this.state.holding) {
      this.setState({ mouseCurrent: e.clientX });
    }
  }

  @autobind
  onMouseDown(e) {
    if (!this.props.disabled) {
      const prop = this.props.isVertical ? 'clientY' : 'clientX';
      this.setState({ holding: true, mouseCurrent: e[prop] });
    }
  }

  @autobind
  onMouseUp() {
    if (this.state.holding) {
      const currentPositionIndex = this.currentPositionIndex();
      this.props.onChange(this.state.marks[currentPositionIndex]);
      this.setState({ holding: false });
    }
  }

  @autobind
  onDoubleClick() {
    this.props.onDoubleClick && this.props.onDoubleClick();
  }

  currentPositionIndex() {
    // initial render creates the ref, just return 0
    if (!this.ref.current) {
      return 0;
    }

    if (this.state.holding) {
      const rect = this.ref.current.getBoundingClientRect();
      const { mouseCurrent } = this.state;

      if (this.props.isVertical) {
        if (mouseCurrent >= rect.bottom) {
          return 0;
        }

        if (mouseCurrent <= rect.top) {
          return this.state.marks.length - 1;
        }

        const index = this.physicalMarks.findIndex(mark => mark >= (rect.bottom - mouseCurrent));
        return index === -1 ? 0 : index;
      }

      if (mouseCurrent <= rect.left) {
        return 0;
      }

      if (mouseCurrent >= rect.right) {
        return this.state.marks.length - 1;
      }

      const index = this.physicalMarks.findIndex(mark => mark >= (mouseCurrent - rect.left));
      return index === -1 ? 0 : index;
    }

    const index = this.state.marks.findIndex(mark => mark >= this.props.value) || 0;
    return index === -1 ? 0 : index;
  }

  rangeStyle() {
    const { length, isVertical } = this.props;

    if (isVertical) {
      return { height: length, width: '5px' };
    }

    return { height: '5px', width: length };
  }

  elapsedStyle(currentPositionIndex) {
    const { isVertical } = this.props;

    if (isVertical) {
      const height = this.physicalMarks[currentPositionIndex];
      return {
        top: `${this.rangeLength - height}px`,
        height: `${height}px`,
        width: '5px'
      };
    }

    return {
      height: '5px',
      width: `${this.physicalMarks[currentPositionIndex]}px`
    };
  }

  markerStyle() {
    const { isVertical } = this.props;

    if (isVertical) {
      return {
        right: '-1.25px',
        top: '-3.75px'
      };
    }

    return {
      right: '-3.75px',
      top: '-1.25px'
    };
  }

  ref = React.createRef();

  render() {
    const { length, value, max, onChange, disabled, isVertical, ...props } = this.props;
    const { holding } = this.state;

    const className = classnames(
      styles.container,
      {
        [styles.holding]: holding
      }
    );

    const currentPositionIndex = this.currentPositionIndex();

    return (
      <div ref={this.ref} className={className} disabled={this.props.disabled} style={this.rangeStyle()} {...props}>
        <div className={styles.elapsed} style={this.elapsedStyle(currentPositionIndex)}>
          <div className={styles.marker} style={this.markerStyle()} />
        </div>
      </div>
    );
  }
}

export default Range;
