import React from 'react';
import styles from './styles.css';

const ActionableTextRow = ({ children, ...rest }) => (
  <div className={styles.container} {...rest}>
    {children}
  </div>
);

export default ActionableTextRow;
