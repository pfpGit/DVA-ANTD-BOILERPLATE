import React from 'react'
import { connect } from 'dva'
import styles from './Menu.less'

import { Input, Card, Select, Button, Table, Icon } from 'antd'
const Search = Input.Search
const Option = Select.Option

const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  render: text => <a href="#">{text}</a>,
}, {
  title: '菜单名',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '资源路径',
  dataIndex: 'resource',
  key: 'resource',
}, {
  title: '菜单编码',
  dataIndex: 'code',
  key: 'code',
}, {
  title: '菜单图标',
  dataIndex: 'icon',
  key: 'icon',
  render: text => <Icon type={ text }/>
}, {
  title: '层级关系',
  dataIndex: 'relative',
  key: 'relative',
}, {
  title: '排序',
  dataIndex: 'order',
  key: 'order',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:void(0)" title="提示"><Icon type="windows-o"/></a>
      <a href="javascript:void(0)" title="人员管理" style={{margin:'0 20px'}}><Icon type="user"/></a>
      <a href="javascript:void(0)" title="添加"><Icon type="plus-circle-o"/></a>
      <a href="javascript:void(0)" title="删除" style={{marginLeft:20}}><Icon type="delete"/></a>
    </span>
  ),
}]

const data = [
    {
    key: '1',
    name: '系统管理',
    resource: 'despartment/list.do',
    code:'M006',
    icon:'windows-o',
    relative:'父级',
    order:'1',
    address: 'New York No. 1 Lake Park',
  },{
    key: '2',
    name: '菜单管理',
    resource: 'despartment/list.do',
    code:'M006',
    icon:'bars',
    relative:'父级',
    order:'1',
    address: 'New York No. 1 Lake Park',
  },{
    key: '3',
    name: '机构管理',
    resource: 'despartment/list.do',
    code:'M006',
    icon:'api',
    relative:'父级',
    order:'1',
    address: 'New York No. 1 Lake Park',
  }
]

function Menu() {

  return (
    <div className={styles.normal}>
         <Card title={
           <div>
              <Search
                  placeholder="请输入关键词"
                  style={{ width: 200 }}
                  onSearch={value => console.log(value)}
              />

              <Select
                showSearch
                style={{ width: 200, marginLeft: 20 }}
                placeholder="请选择上级菜单"
                optionFilterProp="children"
                onChange={ value => console.log(value) }
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="Jack">Jack</Option>
                <Option value="Lucy">Lucy</Option>
                <Option value="1233">123</Option>
                <Option value="qwe">qwe</Option>
                <Option value="asd5">asd</Option>
                <Option value="qweq">qweq</Option>
                <Option value="gaa">gaa</Option>
                <Option value="wqer">wqer</Option>
                <Option value="terywer">terywer</Option>
                <Option value="25asdf">25asdf</Option>
                <Option value="zcxvbn">zcxvbn</Option>
                <Option value="gjhljhgk">gjhljhgk</Option>
              </Select>

              <Button type="primary" style={{margin: '0 20px'}}>查询</Button>

              <Button type="default">重置</Button>
              
           </div>

         } style={{ width: '100%' }}>
         
         <Table columns={columns} dataSource={data}  />
        </Card>
    </div>
  )
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Menu)
