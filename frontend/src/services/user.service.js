import { colorService } from './color.service'
import { httpService } from './http.service'
import { uploadService } from './upload.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const API_USER_ROUTE = 'user'
const API_AUTH_ROUTE = 'auth'

export const userService = {
  login,
  logout,
  signup,
  getLoggedInUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  // update,
}

window.userService = userService

function getUsers() {
  return httpService.get(API_USER_ROUTE)
}

async function getById(userId) {
  const user = await httpService.get(`${API_USER_ROUTE}/${userId}`)
  return user
}

function remove(userId) {
  return httpService.delete(`${API_USER_ROUTE}/${userId}`)
}

// async function update({_id}) {
//     const user = await storageService.get('user', _id)
//     await storageService.put('user', user)

//     // const user = await httpService.put(`user/${_id}`, {_id, score})
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function login(userCred) {
  const user = await httpService.post(`${API_AUTH_ROUTE}/login`, userCred)
  if (user) {
    return saveLocalUser(user)
  }
}

async function signup(userCred) {
  const firstLetter = userCred.email.charAt(0).toUpperCase()
  if (!userCred.fullname) {
    const idx = userCred.email.indexOf('@')

    userCred.fullname = userCred.email.substring(0, idx)
    userCred.fullname = firstLetter + userCred.fullname.slice(1)
  }
  if (!userCred.imgUrl) {
    const color = colorService.getRandomColor()
    userCred.imgUrl = uploadService.generateLetterImage(color, firstLetter)
  }
  const user = await httpService.post(`${API_AUTH_ROUTE}/signup`, userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post(`${API_AUTH_ROUTE}/logout`)
}

function saveLocalUser(user) {
  user = { _id: user._id, email: user.email, fullname: user.fullname, imgUrl: user.imgUrl }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
