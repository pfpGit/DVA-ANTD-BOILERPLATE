import React from 'react'
import styles from './Sidebar.css'

import { Link } from 'dva/router'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu

function Sidebar() {
  const menu = [
    {
      text:'首页',
      icon:'home',
      to:'/',
      sub:[]
    },
    {
      text:'charts',
      icon:'code-o',
      to:'javascript:void(0)',
      sub:[
        {
          text:'lineChart',
          icon:'line-chart',
          to:'/line-chart'
        },
        {
          text:'barChart',
          icon:'bar-chart',
          to:'/bar-chart'
        },
        {
          text:'areaChart',
          icon:'area-chart',
          to:'/area-chart'
        }
      ]
    },
    {
      text:'系统管理',
      icon:'windows-o',
      to:'javascript:void(0)',
      sub:[
        {
          text:'菜单管理',
          icon:'file',
          to:'/menu'
        },
        {
          text:'组织机构',
          icon:'file',
          to:'/org'
        },
        {
          text:'角色管理',
          icon:'file',
          to:'/role'
        }
      ]
    }
  ]
  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      {
        menu.map( ( item, index ) => {
          if( item.sub.length > 0 ){
            return (<SubMenu key={ `${ item.text }-${ index }` } title={<span><Icon type={ item.icon } /><span className="nav-text">{ item.text }</span></span>}>
              {
                item.sub.map( ( item, index ) =>  <Menu.Item key={ `${ item.text }-${ index }`}><Link to={ item.to }>{ item.text }</Link></Menu.Item>)
              }
            </SubMenu>)
          }else{
            return <Menu.Item key={ `${ item.text }-${ index }` }><Link to={ item.to }><Icon type={ item.icon } /><span className="nav-text">{ item.text }</span></Link></Menu.Item>
          }
        })
      }
    </Menu>
  )
}

export default Sidebar
