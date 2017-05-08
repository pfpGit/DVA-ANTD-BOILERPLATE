import React from 'react'
import { connect } from 'dva'

import { Breadcrumb, Row, Col } from 'antd'

function Index() {
  return (
    <div>
      <Breadcrumb style={{ margin: '12px 24px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>

      
      
      <div className="p-panel">
      child1
        
          <Row gutter={34}>
            
            <Col className="gutter-row bgc-white" span={24}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row bgc-white" span={12}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">col-6</div>
            </Col>

          </Row>

          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
          ... <br/><br/>
      </div>

    </div>
  )
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Index);
