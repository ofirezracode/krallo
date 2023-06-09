import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// const PAGE_SIZE = 3

export const boardService = {
  remove,
  query,
  getById,
  add,
  update,
  //   addBoardMsg,
  //   removeBoardMsg,
}

async function query(filterBy = { txt: '' }) {
  try {
    const criteria = {
      // vendor: { $regex: filterBy.txt, $options: 'i' }
    }
    const collection = await dbService.getCollection('boards')
    const boardCursor = await collection.find(criteria)

    // if (filterBy.pageIdx !== undefined) {
    //     boardCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
    // }

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
    const board = collection.findOne({ _id: new ObjectId(boardId) })
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
    console.log(board)
    const collection = await dbService.getCollection('boards')
    await collection.updateOne({ _id: new ObjectId(boardId) }, { $set: board })
    return board
  } catch (err) {
    logger.error(`cannot update board ${boardId}`, err)
    throw err
  }
}

// async function addBoardMsg(boardId, msg) {
//   try {
//     msg.id = utilService.makeId()
//     const collection = await dbService.getCollection('boards')
//     await collection.updateOne({ _id: new ObjectId(boardId) }, { $push: { msgs: msg } })
//     return msg
//   } catch (err) {
//     logger.error(`cannot add board msg ${boardId}`, err)
//     throw err
//   }
// }

// async function removeBoardMsg(boardId, msgId) {
//   try {
//     const collection = await dbService.getCollection('boards')
//     await collection.updateOne({ _id: new ObjectId(boardId) }, { $pull: { msgs: { id: msgId } } })
//     return msgId
//   } catch (err) {
//     logger.error(`cannot add board msg ${boardId}`, err)
//     throw err
//   }
// }
