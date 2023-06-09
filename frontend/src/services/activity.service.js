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
    activity.txt = `${byMember.fullname ? byMember.fullname : 'Ghost'} added ${task.title} to ${groupName}`
  } else if (activityType === 'add-member') {
    activity.txt = `${byMember.fullname} joined ${task.title}`
  } else if (activityType === 'remove-member') {
    activity.txt = `${byMember.fullname} left ${task.title}`
  } else if (activityType === 'add-attachment') {
    activity.txt = `${byMember.fullname} attached to ${task.title}`
  } else if (activityType === 'delete-attachment') {
    activity.txt = `${byMember.fullname} deleted an attachment from ${task.title}`
  } else if (activityType === 'add-checklist') {
    activity.txt = `${byMember.fullname} added Checklist to ${task.title}`
  } else if (activityType === 'delete-checklist') {
    activity.txt = `${byMember.fullname} removed Checklist from ${task.title}`
  } else if (activityType === 'updated-checklist') {
    activity.txt = `${byMember.fullname} updated checklist title at ${task.title}`
  }
  return activity
}
