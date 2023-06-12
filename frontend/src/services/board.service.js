import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { colorService } from './color.service.js'
import { dateTimeService } from './dateTimeService.js'

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
  removeMemberFromTasks,
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
  let filteredBoard = { ...board }

  if (filterBy.keywords) {
    filteredBoard.groups = filteredBoard.groups.map((group) => _filterGroupKeywords(group, filterBy.keywords))
  }

  if (filterBy.members) {
    filteredBoard.groups = filteredBoard.groups.map((group) => _filterGroupMembers(group, filterBy.members))
  }

  if (filterBy.dates) {
    filteredBoard.groups = filteredBoard.groups.map((group) => _filterGroupDates(group, filterBy.dates))
  }

  if (filterBy.labels) {
    filteredBoard.groups = filteredBoard.groups.map((group) => _filterGroupLabels(group, filterBy.labels))
  }

  return filteredBoard
}

function _filterGroupKeywords(group, keywords) {
  let filteredGroup = { ...group }

  filteredGroup.tasks = filteredGroup.tasks.filter((task) => {
    return (
      task.title.includes(keywords) ||
      (task.description && task.description.includes(keywords)) ||
      (task.checklists &&
        task.checklists.filter((checklist) => {
          if (checklist.title.includes(keywords)) return true
          else {
            if (checklist.todos.filter((todo) => todo.title.includes(keywords)).length > 0) return true
          }
          return false
        }).length > 0) ||
      (task.comments && task.comments.filter((comment) => comment.txt.includes(keywords)).length > 0)
    )
  })

  return filteredGroup
}

function _filterGroupMembers(group, members) {
  let filteredGroup = { ...group }
  filteredGroup.tasks = filteredGroup.tasks.filter((task) => {
    if (members === 'no-members') {
      return !task.members || task.members.length === 0
    } else if ((!task.members || task.members.length === 0) && members.length > 0) {
      return false
    } else {
      return members.every((member) => task.members.some((taskMember) => taskMember._id === member._id))
    }
  })

  return filteredGroup
}

function _filterGroupDates(group, dates) {
  let filteredGroup = { ...group }

  const dateFilters = dates.reduce((acc, dateFilter) => {
    if (dateFilter.category === 'time') {
      acc.time = dateFilter.key
    } else {
      acc.complete = dateFilter.key
    }
    return acc
  }, {})

  filteredGroup.tasks = filteredGroup.tasks.filter((task) => {
    if (dateFilters.time === 'no-date') {
      return !task.dueDate
    } else if (dateFilters.time === 'overdue') {
      if (task.dueDate && task.dueDate.dueDate && dateTimeService.hasTimestampPassed(task.dueDate.dueDate)) {
        if (dateFilters.complete === 'completed') {
          return task.dueDate.isCompleted
        } else if (dateFilters.complete === 'not-completed') {
          return !task.dueDate.isCompleted
        } else {
          return true
        }
      } else {
        return false
      }
    } else if (dateFilters.time === 'next-day') {
      if (task.dueDate && task.dueDate.dueDate && dateTimeService.isTimestampNextDay(task.dueDate.dueDate)) {
        if (dateFilters.complete === 'completed') {
          return task.dueDate.isCompleted
        } else if (dateFilters.complete === 'not-completed') {
          return !task.dueDate.isCompleted
        } else {
          return true
        }
      } else {
        return false
      }
    } else if (dateFilters.complete === 'completed') {
      return task.dueDate && task.dueDate.isCompleted
    } else if (dateFilters.complete === 'not-completed') {
      return !task.dueDate || (task.dueDate && !task.dueDate.isCompleted)
    } else {
      return true
    }
  })

  return filteredGroup
}

function _filterGroupLabels(group, labels) {
  let filteredGroup = { ...group }
  filteredGroup.tasks = filteredGroup.tasks.filter((task) => {
    if (labels === 'no-labels') {
      return !task.labelIds || task.labelIds.length === 0
    } else if ((!task.labelIds || task.labelIds.length === 0) && labels.length > 0) {
      return false
    } else {
      return labels.every((label) => task.labelIds.some((taskLabel) => label._id === taskLabel))
    }
  })

  return filteredGroup
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
  return { keyword: '', members: [], dates: [], labels: [] }
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
