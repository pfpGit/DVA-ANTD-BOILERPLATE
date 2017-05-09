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
          // registerModel(app, require('./models/Home'))
          cb(null, { component: require('./routes/Home/Index') })
        }, 'home')
      },
      childRoutes: [
        {
          path: 'menu',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/Menu'))
              cb(null, require('./routes/Menu'))
            }, 'menu')
          },
        },
        {
          path: 'org',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/Org'))
              cb(null, require('./routes/Org'))
            }, 'org')
          },
        },
        {
          path: 'role',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/Role'))
              cb(null, require('./routes/Role'))
            }, 'role')
          },
        },
        {
          path: 'line-chart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/lineChart'))
              cb(null, require('./routes/chart/lineChart/index'))
            }, 'line-chart')
          },
        }, 
        {
          path: 'bar-chart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/barChart'))
              cb(null, require('./routes/chart/barChart/index'))
            }, 'bar-chart')
          },
        }, 
        {
          path: 'area-chart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // registerModel(app, require('./models/areaChart'))
              cb(null, require('./routes/chart/areaChart/index'))
            }, 'area-chart')
          },
        }, 
      ],
    }
  ]

  return <Router history={history} routes={routes} />;
}

export default RouterConfig