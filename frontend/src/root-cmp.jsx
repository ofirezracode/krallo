import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'

export function RootCmp() {
  return (
    <div>
      <AppHeader />
      <main>
        <Routes>{_getRoutes(routes)}</Routes>
      </main>
      <AppFooter />
    </div>
  )
}

function _getRoutes(routes) {
  let routeComponents = []
  if (routes && routes.length > 0) {
    routes.map((route) => {
      const childRoutes = _getRoutes(route.routes)
      routeComponents.push(
        <Route key={route.path} exact={true} element={route.component} path={route.path}>
          {childRoutes}
        </Route>
      )
    })
  }
  return routeComponents
}
