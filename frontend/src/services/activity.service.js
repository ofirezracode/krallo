import { httpService } from './http.service'

const API_URL = 'activity'

export const activityService = {
  add,
  query,
  remove,
  createActivity,
}

function query(filterBy) {
  return httpService.get(`${API_URL}/${filterBy.boardId}`)
}

async function remove(reviewId) {
  await httpService.delete(`${API_URL}/${reviewId}`)
}

async function add(activity) {
  return await httpService.post(API_URL, activity)
}

function createActivity(boardId, activityType, byMember, task, groupName = '') {
  const activity = {
    boardId,
    byMemberId: byMember._id,
    taskId: task._id,
  }

  if (activityType === 'add') {
    activity.txt = ` added ${task.title} to ${groupName}`
  } else if (activityType === 'add-member') {
    activity.txt = ` joined ${task.title}`
  } else if (activityType === 'remove-member') {
    activity.txt = ` left ${task.title}`
  } else if (activityType === 'add-attachment') {
    activity.txt = ` attached to ${task.title}`
  } else if (activityType === 'delete-attachment') {
    activity.txt = ` deleted an attachment from ${task.title}`
  } else if (activityType === 'add-checklist') {
    activity.txt = ` added Checklist to ${task.title}`
  } else if (activityType === 'delete-checklist') {
    activity.txt = ` removed Checklist from ${task.title}`
  } else if (activityType === 'updated-checklist') {
    activity.txt = ` updated checklist title at ${task.title}`
  }
  return activity
}
