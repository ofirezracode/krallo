import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  // update,
}

window.userService = userService

function getUsers() {
  return storageService.query('user')
  // return httpService.get(`user`)
}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  // const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
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
  const users = await storageService.query('user')
  console.log('services users',users);
  console.log(userCred, 'userCred');
  const user = users.find((user) => user.email === userCred.email)
  console.log(user, 'user');
  // const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}
async function signup(userCred) {
  if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685965117/vikaaq6fdnfgmelpafh6.png'
  const user = await storageService.post('user', userCred)
  // const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async () => {
//   await userService.signup({ fullname: 'Etai', email: 'etai@krallo.com', password: '123', isAdmin: true })
//   await userService.signup({ fullname: 'Tamar', email: 'tamar@krallo.com', password: '123', isAdmin: true })
//   await userService.signup({ fullname: 'Ofir', email: 'ofir@krallo.com', password: '123', isAdmin: true })
//   await userService.signup({ fullname: 'User', email: 'user@krallo.com', password: '123', isAdmin: false })
// })()
