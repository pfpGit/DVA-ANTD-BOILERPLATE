import React from 'react'
import { Router } from 'dva/router'
import MainLayout from './routes/App'

const cached = {}
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: MainLayout,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          // registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/Home/Index') })
        }, 'home')
      },
      childRoutes: [
        {
          path: 'line-chart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/chart/lineChart/index'))
            }, 'line-chart')
          },
        }, 
        {
          path: 'bar-chart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/chart/barChart/index'))
            }, 'bar-chart')
          },
        }, 
        {
          path: 'area-chart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/chart/areaChart/index'))
            }, 'area-chart')
          },
        }, 
      ],
    }
  ]

  return <Router history={history} routes={routes} />
}

export default RouterConfig