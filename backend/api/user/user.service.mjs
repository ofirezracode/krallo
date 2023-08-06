import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { activityService } from '../activity/activity.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
  query,
  getById,
  getByEmail,
  remove,
  update,
  add,
}

async function query() {
  try {
    const collection = await dbService.getCollection('users')
    let users = await collection.find({}).toArray()
    users = users.map((user) => {
      delete user.password
      user.createdAt = ObjectId(user._id).getTimestamp()
      return user
    })
    return users
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user by id: ${userId}`, err)
    throw err
  }
}
async function getByEmail(email) {
  try {
    const collection = await dbService.getCollection('users')
    const user = await collection.findOne({ email })
    return user
  } catch (err) {
    logger.error(`while finding user by email: ${email}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('users')
    await collection.deleteOne({ _id: ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user) {
  try {
    const imgUrl = imgUrl ? { imgUrl } : ''
    const userToSave = {
      _id: ObjectId(user._id),
      fullname: user.fullname,
      ...imgUrl,
    }
    const collection = await dbService.getCollection('users')
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    const userToAdd = {
      email: user.email,
      password: user.password,
      fullname: user.fullname,
      imgUrl: user.imgUrl,
    }
    const collection = await dbService.getCollection('users')
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    logger.error('cannot add user', err)
    throw err
  }
}
