import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const activityService = {
  query,
  remove,
  add,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('activities')
    let activities = await collection
      .aggregate([
        {
          $match: criteria,
        },
        {
          $lookup: {
            localField: 'byMemberId',
            from: 'users',
            foreignField: '_id',
            as: 'fromUser',
          },
        },
        {
          $unwind: '$fromUser',
        },
        {
          $project: {
            _id: 1,
            taskId: 1,
            txt: 1,
            'fromUser._id': 1,
            'fromUser.fullname': 1,
            'fromUser.imgUrl': 1,
          },
        },
      ])
      .toArray()

    activities = activities.map((activity) => {
      activity.createdAt = activity._id.getTimestamp().getTime()
      delete activity.byMemberId
      return activity
    })

    return activities
  } catch (err) {
    logger.error('cannot find activities', err)
    throw err
  }
}

async function remove(activityId) {
  try {
    const collection = await dbService.getCollection('activities')
    const criteria = { _id: ObjectId(activityId) }
    const { deletedCount } = await collection.deleteOne(criteria)
    return deletedCount
  } catch (err) {
    logger.error(`cannot remove activity ${activityId}`, err)
    throw err
  }
}

async function add(activity) {
  try {
    const activityToAdd = {
      ...activity,
      boardId: ObjectId(activity.boardId),
      byMemberId: ObjectId(activity.byMemberId),
    }
    const collection = await dbService.getCollection('activities')
    await collection.insertOne(activityToAdd)
    return activityToAdd
  } catch (err) {
    logger.error('cannot insert activity', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.boardId) criteria.boardId = ObjectId(filterBy.boardId)
  return criteria
}
