import React from 'react'
import { connect } from 'dva'
import './App.less'

import Main from '../components/Main'

class App extends React.Component {
  render() {
    return (
      <Main>{this.props.children}</Main>
    )
  }
}

export default connect()(App)
