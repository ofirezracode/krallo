import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { asyncLocalStorage } from '../../services/als.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy = {}) {
  try {
    logger.debug(filterBy)
    const criteria = _buildCriteria(filterBy)
    logger.debug(criteria)
    const collection = await dbService.getCollection('activities')
    let activities = await collection
      .aggregate([
        {
          $match: criteria,
        },
        // {
        //   $lookup: {
        //     localField: 'boardId',
        //     from: 'boards',
        //     foreignField: '_id',
        //     as: 'fromBoard',
        //   },
        // },
        // {
        //   $unwind: '$fromBoard',
        // },
      ])
      .toArray()

    // logger.debug(activities)
    // activities = activities.map((activity) => {
    //   activity.byMember = { _id: activity.byUser._id, fullname: activity.byUser.fullname, imgUrl: activity.byUser.imgUrl }
    //   delete activity.byMemberId
    //   return activity
    // })

    return activities
  } catch (err) {
    logger.error('cannot find activities', err)
    throw err
  }
}

async function remove(activityId) {
  try {
    // const store = asyncLocalStorage.getStore()
    // const { loggedinUser } = store
    const collection = await dbService.getCollection('activities')
    // remove only if user is owner/admin
    const criteria = { _id: ObjectId(activityId) }
    // if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
    const { deletedCount } = await collection.deleteOne(criteria)
    return deletedCount
  } catch (err) {
    logger.error(`cannot remove activity ${activityId}`, err)
    throw err
  }
}

async function add(activity) {
  try {
    logger.debug('activity', activity)
    const activityToAdd = {
      ...activity,
      boardId: ObjectId(activity.boardId),
      byMemberId: ObjectId(activity.byMemberId),
    }
    logger.debug('activityToAdd', activityToAdd)
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
  if (filterBy.boardId) criteria.boardId = new ObjectId(filterBy.boardId)
  return criteria
}

export const activityService = {
  query,
  remove,
  add,
}
