import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from './store/store'
import { RootCmp } from './root-cmp'
import './assets/styles/main.scss'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </GoogleOAuthProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
