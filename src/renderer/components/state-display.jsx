import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

const StateDisplay = ({ browser }) => (
  <div>
    <ul>
      {browser.get('files').map(track => <li key={track}>{track}</li>)}
    </ul>
  </div>
);

StateDisplay.propTypes = {
  browser: ImmutablePropTypes.map.isRequired
};

export default connect(({ browser }) => ({ browser }))(StateDisplay);
