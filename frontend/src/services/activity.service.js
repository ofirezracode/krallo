import { utilService } from './util.service'

export const activityService = {
  createActivity,
}

// {
//   _id: 'a101',
//   txt: 'Changed Color',
//   createdAt: 154514,
//   byMember: {
//     _id: 'u103',
//     fullname: 'Etai Levi',
//     imgUrl: '../assets/img/members/etai-pic.jpg',
//   },
//   task: {
//     _id: 'c101',
//     title: 'Replace Logo',
//   },
// },

function createActivity(activityType, byMember, task, groupName = '') {
  const activity = {
    _id: utilService.makeId(),
    byMember,
    task,
  }

  if (activityType === 'add') {
    activity.txt = `${byMember.fullname ? byMember.fullname : 'Ghost'} added ${task.title} to ${groupName}`
  }else if(activityType === 'add-member') {
    activity.txt = `${byMember.fullname} joined ${task.title}`
  }else if(activityType === 'remove-member') {
    activity.txt = `${byMember.fullname} left ${task.title}`
  }
  return activity
}
