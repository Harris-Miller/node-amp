import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

const StateDisplay = ({ browser }) => (
  <div>
    <ul>
      {browser.get('files').toArray().map(([track, info]) => {
        const bgColor = info.processed ? 'white' : 'red';
        return <li key={track} style={{ backgroundColor: bgColor }}>{track}</li>;
      })}
    </ul>
  </div>
);

StateDisplay.propTypes = {
  browser: ImmutablePropTypes.map.isRequired
};

export default connect(({ browser }) => ({ browser }))(StateDisplay);
