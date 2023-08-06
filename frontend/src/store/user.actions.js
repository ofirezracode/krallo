import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'

import { SET_USER, SET_USERS, SET_WATCHED_USER } from './user.reducer.js'

export async function loadUsers() {
  try {
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.log('UserActions: err in loadUsers', err)
  }
}

// export async function removeUser(userId) {
//     try {
//         await userService.remove(userId)
//         store.dispatch({ type: REMOVE_USER, userId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({
      type: SET_USER,
      user,
    })
    // socketService.login(user)
    return user
  } catch (err) {
    console.log('Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({
      type: SET_USER,
      user,
    })
    // socketService.login(user)
    return user
  } catch (err) {
    console.log('Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({
      type: SET_USER,
      user: null,
    })
    // socketService.logout()
  } catch (err) {
    console.log('Cannot logout', err)
    throw err
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_WATCHED_USER, user })
  } catch (err) {
    console.log('Cannot load user', err)
  }
}
