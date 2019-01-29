import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import styles from './styles.css';

class Range extends Component {
  static propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    value: 0,
    max: 100,
    onChange: null,
    disabled: false
  };

  state = {
    holding: false,
    mouseCurrent: 0
  };

  get mouseWithinRange() {
    const { mouseCurrent } = this.state;

    if (mouseCurrent < this.rangeLeftPosition) {
      return this.rangeLeftPosition;
    }

    if (mouseCurrent > this.rangeRightPosition) {
      return this.rangeRightPosition;
    }

    return mouseCurrent;
  }

  get markerPosition() {
    // because react has to render first to create the ref
    if (this.ref.current) {
      // if holding, be at current position of mouse, within range of component
      if (this.state.holding) {
        return this.mouseWithinRange - this.rangeLeftPosition - 3.75;
      }

      return ((this.props.value / this.props.max) * this.rangeWidth) - 3.75; // 3.75 is half the width of the marker
    }

    // just say 0 for when ref hasn't been created yet
    return 0;
  }

  get currentPosition() {
    if (this.state.holding) {
      return ((this.mouseWithinRange - this.rangeLeftPosition) / (this.rangeRightPosition - this.rangeLeftPosition)) * 100;
    }

    return (this.props.value / this.props.max) * 100;
  }

  get rangeWidth() {
    return this.ref.current.clientWidth;
  }

  get rangeLeftPosition() {
    return this.ref.current.offsetLeft;
  }

  get rangeRightPosition() {
    return this.rangeLeftPosition + this.rangeWidth;
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    this.ref.current.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener(this.onMouseMove);
    this.ref.current.removeEventListener(this.onMouseUp);
    document.removeEventListener(this.onMouseDown);
  }

  @autobind
  onMouseMove(e) {
    if (this.state.holding) {
      this.setState({ mouseCurrent: e.clientX });
    }
  }

  @autobind
  onMouseDown(e) {
    this.setState({ holding: true, mouseCurrent: e.clientX });
  }

  @autobind
  onMouseUp(e) {
    if (this.state.holding) {
      this.props.onChange(this.currentPosition);
      this.setState({ holding: false });
    }
  }

  ref = React.createRef();

  render() {
    const className = classnames(
      styles.container,
      { [styles.holding]: this.state.holding }
    );

    const { value, max, onChange, disabled, ...props } = this.props;

    return (
      <div ref={this.ref} className={className} disabled={this.props.disabled} {...props}>
        <div className={styles.elapsed} style={{ width: `${this.currentPosition}%` }} />
        <div className={styles.marker} style={{ left: `${this.markerPosition}px` }} />
      </div>
    );
  }
}

export default Range;
