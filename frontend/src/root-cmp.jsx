import { Routes, Route } from 'react-router'
import React, { useState } from 'react';
import routes from './routes'

//remove line
import { boardService } from './services/board.service.local'
import { AppHeaderHome } from './cmps/app-header-home'
import { AppFooter } from './cmps/app-footer'
import AppHeader from './cmps/app-header'

export function RootCmp() {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <div>
        {loggedIn ? <AppHeader />:  <AppHeaderHome />}
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
