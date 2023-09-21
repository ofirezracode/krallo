import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.mjs'
import { logger } from '../../services/logger.service.mjs'

const cryptr = new Cryptr(process.env.SECRET1 || 'kr@al$lo-se!cre*t-t&ok#en')

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken,
}

async function login(email, password) {
  logger.debug(`auth.service - login with email: ${email}`)

  const user = await userService.getByEmail(email)
  if (!user) return Promise.reject('Invalid email or password')

  //remove line when implamenting login with pass
  password = '123'
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid email or password')

  delete user.password
  user._id = user._id.toString()
  return user
}

async function signup({ email, password, fullname, imgUrl = '' }) {
  const saltRounds = 10
  logger.debug(`auth.service - signup with email: ${email}, fullname: ${fullname}`)
  //remove after password is implamented
  password = password ? password : '123'
  if (!email || !password) return Promise.reject('Missing required signup information')

  const userExist = await userService.getByEmail(email)
  if (userExist) {
    login(email)
    return
  }

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ email, password: hash, fullname, imgUrl })
}

function getLoginToken(user) {
  const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
  return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}
