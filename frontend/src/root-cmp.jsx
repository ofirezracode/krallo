import { Routes, Route } from 'react-router'
import React, { useState } from 'react';
import routes from './routes'
import { useSelector } from "react-redux";


import { AppHeaderHome } from './cmps/app-header-home'
import { AppHeader } from './cmps/app-header'

export function RootCmp() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const darkClass = isDarkMode ? 'dark' : ''

  function toggleDarkMode() {
    setIsDarkMode(prev => !prev)
  }
  return (
    <div className='main-routes'>
      {/* <header className='headers'> */}
      {user ? <AppHeader toggleDarkMode={toggleDarkMode} darkClass={darkClass} /> : <AppHeaderHome />}
      {/* </header> */}
      <main>
        <Routes>{_getRoutes(routes)}</Routes>
      </main>
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
