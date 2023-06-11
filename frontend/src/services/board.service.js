import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { colorService } from './color.service.js'

const API_URL = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  saveTask,
  saveNewTask,
  getEmptyBoard,
  createTask,
  getTaskById,
  createGroup,
  createBoardFromTemplate,
  filterBoard,
  move,
  getBoardById,
  getGroupByTaskId,
  toggleMemberOnTask,
  getEmptyTask,
  getEmptyAttachment,
  removeLabelFromTasks,
  getEmptyFilterBy,
  toggleMemberOnBoard,
  removeMemberFromTasks
}

async function query(filterBy = {}) {
  return httpService.get(API_URL, filterBy)
}

function getById(boardId) {
  return httpService.get(`${API_URL}/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(`${API_URL}/${boardId}`)
}
async function save(board) {
  let savedBoard
  if (board._id) {
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

async function saveTask(board, updatedTask, activity) {
  let group
  let task
  let taskIdx
  for (let i = 0; i < board.groups.length && !task; i++) {
    group = board.groups[i]
    for (let j = 0; j < board.groups[i].tasks.length; j++) {
      if (board.groups[i].tasks[j]._id === updatedTask._id) {
        task = board.groups[i].tasks[j]
        taskIdx = j
        break
      }
    }
  }

  task = { ...updatedTask }
  group.tasks[taskIdx] = task

  // if (activity) {
  //   board.activities.unshift(activity)
  // }

  const newBoard = await save(board)
  return newBoard
}

async function saveNewTask(board, groupId, updatedTask, activity) {
  let group
  for (let i = 0; i < board.groups.length; i++) {
    if (groupId === board.groups[i]._id) {
      group = board.groups[i]
    }
  }

  group.tasks.push(updatedTask)

  // if (activity) {
  //   board.activities.unshift(activity)
  // }

  const newBoard = await save(board)
  return newBoard
}

function filterBoard(board, filterBy = {}) {
  const filteredBoard = { ...board }
  return filteredBoard
}

function move(type, board, sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx) {
  const newBoard = { ...board }
  const { groups } = newBoard
  const sourceGroupIdx = groups.findIndex((group) => group._id === sourceGroupId)
  const destGroupIdx = groups.findIndex((group) => group._id === destGroupId)
  if (type === 'task') {
    return _moveTask(newBoard, groups, sourceGroupIdx, destGroupIdx, taskSourceIdx, taskDestIdx)
  } else if (type === 'group') {
    return _moveGroup(newBoard, groups, sourceGroupIdx, destGroupIdx)
  }
}

function _moveTask(newBoard, groups, sourceGroupIdx, destGroupIdx, taskSourceIdx, taskDestIdx) {
  const [removed] = groups[sourceGroupIdx].tasks.splice(taskSourceIdx, 1)
  groups[destGroupIdx].tasks.splice(taskDestIdx, 0, removed)
  return newBoard
}

function _moveGroup(newBoard, groups, sourceGroupIdx, destGroupIdx) {
  const [removed] = groups.splice(sourceGroupIdx, 1)
  groups.splice(destGroupIdx, 0, removed)
  return newBoard
}

function toggleMemberOnTask(task, member, activityType) {
  if (activityType === 'add-member') {
    task.members.push(member)
  } else if (activityType === 'remove-member') {
    const memberIdx = task.members.findIndex((m) => m._id === member._id)
    task.members.splice(memberIdx, 1)
  }

  return task
}

function toggleMemberOnBoard(board, member, activityType) {
  if (activityType === 'add-member-board') {
    board.members.push(member)
  } else if (activityType === 'remove-member-board') {
    const memberIdx = board.members.findIndex((m) => m._id === member._id)
    board.members.splice(memberIdx, 1)
  }
  return board
}

function createBoardFromTemplate() { }

function createTask(title) {
  const task = {
    _id: utilService.makeId(),
    title: title,
    attachments: [],
    members: [],
    checklists: [],
    style: {
      bgColor: '',
    },
  }

  return task
}

function getGroupByTaskId(board, taskId) {
  for (let i = 0; i < board.groups.length; i++) {
    for (let j = 0; j < board.groups[i].tasks.length; j++) {
      if (board.groups[i].tasks[j]._id === taskId) {
        return board.groups[i]
      }
    }
  }
  return null
}

function getTaskById(board, taskId) {
  if (board && board.groups) {
    for (let i = 0; i < board.groups.length; i++) {
      for (let j = 0; j < board.groups[i].tasks.length; j++) {
        if (board.groups[i].tasks[j]._id === taskId) {
          return board.groups[i].tasks[j]
        }
      }
    }
  }
  return null
}

function removeLabelFromTasks(board, labelId) {
  const updatedBoard = { ...board }
  updatedBoard.groups.forEach((group) => {
    group.tasks.forEach((task) => {
      if (task.labelIds) {
        task.labelIds = task.labelIds.filter((id) => id !== labelId)
      }
    })
  })
  return updatedBoard
}

function removeMemberFromTasks(board, memberId) {
  console.log('memberId', memberId);
  const updatedBoard = { ...board }
  updatedBoard.groups.forEach((group) => {
    group.tasks.forEach((task) => {
      if (task.members) {
        task.members = task.members.filter((member) => member._id !== memberId)
      }
    })
  })
  return updatedBoard
}

function getBoardById(boards, boardId) {
  return boards.find((board) => board._id === boardId)
}

function createGroup(title) {
  const group = {
    _id: utilService.makeId(),
    title,
    style: {},
    tasks: [],
  }

  return group
}

function getEmptyBoard(title, imgUrl) {
  return {
    title,
    isStarred: false,
    createdAt: Date.now(),
    groups: [createGroup('New group')],
    tasks: [],
    style: {
      type: 'img',
      imgUrl,
    },
    labels: [],
  }
}

function getEmptyFilterBy() {
  return { keyword: '', members: [], dueDate: '', labels: [] }
}

// function getEmptyTask() {
//   {

//     title : '',
//     "style" : {
//         "bgColor" : "#94c748",
//         "type" : "full"
//     },
//     "checklists" : [

//     ],
//     "members" : [

//     ],
//     "labelIds" : [

//     ]
// }
// }
function getEmptyTask() {
  return {
    title: 'Loading...',
  }
}

function getEmptyAttachment() {
  return {
    _id: utilService.makeId(),
    title: '',
    url: '',
    uploadedAt: Date.now(),
  }
}

// async function addBoardMsg(boardId, txt) {
//     const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
//     return savedMsg
// }
