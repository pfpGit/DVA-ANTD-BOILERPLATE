import React from 'react';
import { connect } from 'dva';
import styles from './Index.css';

function Home() {
  return (
    <div className={styles.normal}>
      主页
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
