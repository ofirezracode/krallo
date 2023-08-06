import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const boardService = {
  remove,
  query,
  getById,
  add,
  update,
}

async function query() {
  try {
    const collection = await dbService.getCollection('boards')
    const boardCursor = await collection.find({})

    const boards = boardCursor.toArray()
    return boards
  } catch (err) {
    logger.error('cannot find boards', err)
    throw err
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('boards')
    const board = await collection.findOne({ _id: new ObjectId(boardId) })
    return board
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err)
    throw err
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('boards')
    await collection.deleteOne({ _id: new ObjectId(boardId) })
    return boardId
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err)
    throw err
  }
}

async function add(board) {
  try {
    const collection = await dbService.getCollection('boards')
    await collection.insertOne(board)
    return board
  } catch (err) {
    logger.error('cannot insert board', err)
    throw err
  }
}

async function update(board, boardId) {
  try {
    const boardToSave = {
      ...board,
    }
    delete boardToSave._id
    const collection = await dbService.getCollection('boards')
    await collection.updateOne({ _id: new ObjectId(boardId) }, { $set: boardToSave })
    return board
  } catch (err) {
    logger.error(`cannot update board ${boardId}`, err)
    throw err
  }
}
