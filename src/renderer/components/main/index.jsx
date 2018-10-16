import React from 'react';
import Browser from '../browser';
import Queue from '../queue';
import classes from './styles.css';

export default () => (
  <div className={classes.container}>
    <Browser />
    <Queue />
  </div>
);
