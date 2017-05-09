import React from 'react';
import { connect } from 'dva';
import styles from './Role.css';

function Role() {
  return (
    <div className={styles.normal}>
      Route Component: Role
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Role);
