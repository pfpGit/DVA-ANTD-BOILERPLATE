import React from 'react';
import { connect } from 'dva';
import styles from './Org.css';

function Org() {
  return (
    <div className={styles.normal}>
      Route Component: Org
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Org);
