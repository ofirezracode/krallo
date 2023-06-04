import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boards'

const boards = [
  {
    title: 'Spaceship dev proj',
    isStarred: true,
    createdBy: {
      _id: 'u101',
      fullname: 'Ofir Ezra',
      imgUrl: '../assets/img/members/ofir-pic.jpg',
    },
    style: {
      type: 'img',
      imgUrl:
        'https://images.unsplash.com/photo-1684852439598-59db50985462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    },
    labels: [
      {
        _id: 'l101',
        title: 'Done!',
        color: '#4bce97',
      },
      {
        _id: 'l102',
        title: 'In Progress',
        color: '#faa53d',
      },
      {
        _id: 'l103',
        title: 'Error',
        color: '#f87462',
      },
      {
        _id: 'l104',
        title: 'Design',
        color: '#9f8fef',
      },
      {
        _id: 'l105',
        title: 'React',
        color: '#579dff',
      },
      {
        _id: 'l106',
        title: 'Backend',
        color: '#60c6d2',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Ofir Ezra',
        imgUrl: '../assets/img/members/ofir-pic.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Tamar Millgram',
        imgUrl: '../assets/img/members/tamar-pic.jpg',
      },
      {
        _id: 'u103',
        fullname: 'Etai Levi',
        imgUrl: '../assets/img/members/etai-pic.jpg',
      },
    ],
    groups: [
      {
        _id: 'g101',
        title: 'Backlog',
        // "archivedAt": 1589983468418,
        tasks: [
          {
            _id: 'c101',
            title: 'Adding a task recording feature',
            description: 'Let the user to record a task instead of writing it. Also, it will be more productive and comfortable',
            comments: [
              {
                _id: 'ZdPnm',
                txt: 'also @Ofir please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u103',
                  fullname: 'Etai Levi',
                  imgUrl: '../assets/img/members/etai-pic.jpg',
                },
              },
            ],
            byMember: {
              _id: 'u102',
              fullname: 'Tamar Millgram',
              imgUrl: '../assets/img/members/tamar-pic.jpg',
            },
          },
          {
            _id: 'c102',
            title: 'Implement user authentication feature',
          },
          {
            _id: 'c103',
            title: 'Optimize database queries',
          },
          {
            _id: 'c104',
            title: 'Implement responsive design',
          },
        ],
        style: {},
      },
      {
        _id: 'g102',
        title: 'Design',
        tasks: [
          {
            _id: 'd103',
            title: 'Create wireframes for homepage',
            // "archivedAt": 1589983468418,
          },
          {
            _id: 'd104',
            title: 'Create grid template for the board',
            description:
              'Develop the HTML and CSS structure for the homepage. Implement the layout according to the wireframes provided in the Design group.',
            comments: [
              {
                _id: 'ZdPnm',
                txt: 'also @etail please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: '../assets/img/members/ofir-pic.jpg',
                },
              },
            ],
            checklists: [
              {
                _id: 'YEhmF',
                title: 'New components needed for the feature',
                todos: [
                  {
                    _id: '351Dz',
                    title: 'Card',
                    isDone: false,
                  },
                  {
                    _id: '212jX',
                    title: 'Button',
                    isDone: true,
                  },
                  {
                    _id: '947jQ',
                    title: 'Menu',
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ['u101', 'u102', 'u103'],
            labelIds: ['l101', 'l104'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u102',
              fullname: 'Tamar Millgram',
              imgUrl: '../assets/img/members/tamar-pic.jpg',
            },
            style: {
              bgColor: '#faa53d',
            },
          },
        ],
        style: {},
      },
      {
        _id: 'g103',
        title: 'To Do',
        tasks: [
          {
            _id: 'c105',
            title: 'Create GIT repository',
            description:
              'Create a new Git repository for the project. Initialize the repository with the initial project structure and configure branch protection rules.',
            // "archivedAt": 1589983468418,
          },
          {
            _id: 'c106',
            title: 'Create grid template for the board',
            description:
              'Develop the HTML and CSS structure for the homepage. Implement the layout according to the wireframes provided in the Design group.',
            comments: [
              {
                _id: 'ZdPnm',
                txt: "Please, don't forget to do git pull before push",
                createdAt: 1590999817874,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: '../assets/img/members/ofir-pic.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: '../assets/img/members/tamar-pic.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: '../assets/img/members/ofir-pic.jpg',
                },
              },
            ],
            checklists: [
              {
                _id: 'YEhmF',
                title: 'Add PWA for our app for offline mode.',
                todos: [
                  {
                    _id: '635gW',
                    title: 'Start by replay the lesson of Stav',
                    isDone: true,
                  },
                  {
                    _id: '989lA',
                    title: 'Implement this option step by step',
                    isDone: false,
                  },
                  {
                    _id: '147Vj',
                    title: 'Check the DevTools',
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ['u101', 'u102', 'u103'],
            labelIds: ['l103', 'l107'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: '../assets/img/members/etai-pic.jpg',
            },
            style: {
              bgColor: '#579dff',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        _id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u103',
          fullname: 'Etai Levi',
          imgUrl: '../assets/img/members/etai-pic.jpg',
        },
        task: {
          _id: 'c107',
          title: 'Replace Logo',
        },
      },
    ],

    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  },
  {
    title: 'Another project',
    isStarred: true,
    groups: [],
    style: {
      type: 'img',
      imgUrl:
        'https://images.unsplash.com/photo-1626440409578-8bc4ab03b772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
  },
  {
    title: 'Project X',
    isStarred: true,
    groups: [],
    style: {
      type: 'img',
      imgUrl:
        'https://images.unsplash.com/photo-1682685797769-481b48222adf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
  },
  {
    title: 'Research',
    isStarred: false,
    groups: [],
    style: {
      type: 'img',
      imgUrl:
        'https://images.unsplash.com/photo-1685306893255-b2b6f6272d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1298&q=80',
    },
  },
]

export const boardService = {
  query,
  getById,
  save,
  remove,
  saveTask,
  getEmptyBoard,
  createTask,
  getTaskById,
  createGroup,
  createBoardFromTemplate,
  dndTask,
  dndGroup,
  getBoardById,
}
window.bs = boardService

// _createBoards()

async function query(filterBy = {}) {
  var boards = await storageService.query(STORAGE_KEY)
  // if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
  // }
  // if (filterBy.price) {
  //     boards = boards.filter(board => board.price <= filterBy.price)
  // }
  return boards
}

async function getById(boardId) {
  return await storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  let savedBoard
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board)
  } else {
    savedBoard = await storageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

async function saveTask(boardId, groupId, updatedTask, activity) {
  const board = await getById(boardId)
  const group = board.groups.find((group) => group._id === groupId)
  let task = group.tasks.find((task) => task._id === updatedTask._id)
  if (task && Object.keys(task).length > 0) {
    task = { ...updatedTask }
  } else {
    group.tasks.push(updatedTask)
  }

  board.activities.unshift(activity)
  save(board)
  return board
}

function dndTask(board, sourceGroupId, destGroupId, taskSourceIndex, taskDestIndex) {
  const newBoard = { ...board }
  const { groups } = newBoard
  const sourceGroupIdx = groups.findIndex((group) => group._id === sourceGroupId)
  const destGroupIdx = groups.findIndex((group) => group._id === destGroupId)
  const [removed] = groups[sourceGroupIdx].tasks.splice(taskSourceIndex, 1)
  groups[destGroupIdx].tasks.splice(taskDestIndex, 0, removed)
  return newBoard
}
function dndGroup(board, sourceGroupId, destGroupId) {
  const newBoard = { ...board }
  const { groups } = newBoard
  const sourceGroupIdx = groups.findIndex((group) => group._id === sourceGroupId)
  const destGroupIdx = groups.findIndex((group) => group._id === destGroupId)
  const [removed] = groups.splice(sourceGroupIdx, 1)
  groups.splice(destGroupIdx, 0, removed)
  return newBoard
}

function createBoardFromTemplate() { }

function createTask(taskText) {
  const task = {
    _id: utilService.makeId(),
    title: taskText,
  }

  return task
}

function getTaskById(boards, boardId, taskId) {
  const board = getBoardById(boards, boardId)
  if (!board) return {}
  let task
  for (let i = 0; i < board.groups.length && !task; i++) {
    for (let j = 0; j < board.groups[i].tasks.length; j++) {
      if (board.groups[i].tasks[j]._id === taskId) {
        task = board.groups[i].tasks[j]
        break
      }
    }
  }
  return task
}

function getBoardById(boards, boardId) {
  return boards.find((board) => board._id === boardId)
}

function createGroup(groupTitle) {
  const group = {
    _id: utilService.makeId(),
    title: groupTitle,
    style: {},
    tasks: [],
  }

  return group
}

async function _createBoards() {
  await save(boards[0])
  await save(boards[1])
  await save(boards[2])
  await save(boards[3])
}

function getEmptyBoard() {
  return {
    title: 'New board',
    isStarred: false,
    createdAt: Date.now(),
    groups: [createGroup('New group')],
    style: {
      type: 'bgColor',
      bgColor: utilService.getRandomColor(),
    },
  }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
