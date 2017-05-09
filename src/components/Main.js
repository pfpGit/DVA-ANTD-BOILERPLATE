import React from 'react'
import styles from './Main.css'

import { Link } from 'dva/router'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu
const { Header, Sider, Content } = Layout
import Scroll from './Common/Scroll'
import Sidebar from './Common/Sidebar'

class Main extends React.Component {
  state = {
    collapsed: true,
  }

  over = () => {
    this.setState({
      collapsed: false,
    })
  }

  leave = () => {
    this.setState({
      collapsed: true,
    })
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onMouseOver={this.over}
          onMouseLeave={this.leave}
        >
          <div className="logo" >
            <img className={ styles.logoImg } src={require('../assets/images/logo.png')} alt="logo"/>
            <img className={ styles.logoText } src={require('../assets/images/qianliyan-white.png')} alt="" />
          </div>

        <div className="menu-wrap">
          <Scroll>
            <Sidebar></Sidebar>
          </Scroll>  
        </div>  

        </Sider>
        <Layout>

          <Header className={ styles.header }>
            <img className={ this.state.collapsed ? '': 'hide' } src={ require('../assets/images/qianliyan-blue.png') } alt=""/>
            <div className="fr">
              <ul className={ styles.headerUl }>
                <li className={ styles.headerLi }><div className={ styles.tx } style={{ backgroundImage: `url('${ require('../assets/images/tx.png') }')`}}></div>魏倩倩</li>
                <li className={ styles.headerLi }>切换旧版</li>
                <li className={ `${styles.headerLi} bd-none` }>
                  <Icon className={ styles.skin } type="skin"></Icon>
                  <Icon className={ styles.setting } type="setting"></Icon>
                </li>
              </ul>
            </div>
          </Header>

          <Scroll>
            <Content style={{ margin: '24px 8px 24px 16px', padding: 0 }}>
                { this.props.children }
            </Content>
          </Scroll>

        </Layout>
      </Layout>
    )
  }
}


export default Main
