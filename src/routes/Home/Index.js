import React from 'react';
import { connect } from 'dva';
import styles from './Index.css';

function Home() {
  return (
    <div className={styles.normal}>
      Route Component: Home/Index
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
