import { render } from 'react-dom'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boards'

const boards = [
  {
    title: 'Rocket Team',
    isStarred: true,
    createdBy: {
      _id: 'u101',
      fullname: 'Ofir Ezra',
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
    },
    style: {
      type: 'img',
      imgUrl:
        'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685965910/photo-1576502200916-3808e07386a5_bhkumw.jpg'
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
        email: 'ofir@krallo.com',
        imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Tamar Millgram',
        email: 'tamar@krallo.com',
        imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
      },
      {
        _id: 'u103',
        fullname: 'Etai Levi',
        email: 'etai@krallo.com',
        imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
      },
    ],
    groups: [
      {
        _id: 'g101',
        title: 'Backlog',
        // "archivedAt": 1589983468418,
        tasks: [
          {
            _id: 'aa101',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
                },
              },
            ],
            style: {
              bgColor: '#579dff',
              type: 'half',
            },

            members: [
              {
                _id: 'u101',
                fullname: 'Ofir Ezra',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
              },
            ],
            byMember: {
              _id: 'u102',
              fullname: 'Tamar Millgram',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
            },
          },
          {
            _id: 'aa102',
            title: 'Implement user authentication feature',
            description: 'Develop a secure user authentication system for the website using OAuth2.0. Integrate with existing user database and allow login via social media accounts.'
          },
          {
            _id: 'aa103',
            title: 'Optimize database queries',
            style: {
              bgColor: '#9f8fef',
              type: 'half',
            },
          },
          {
            _id: 'aa104',
            title: 'Implement responsive design',
            labelIds: ['l102']
          },
        ],
        style: {},
      },
      {
        _id: 'g102',
        title: 'Design',
        tasks: [
          {
            _id: 'bb103',
            title: 'Create wireframes for homepage',
            // "archivedAt": 1589983468418,
            labelIds: ['l104'],
            members: [{
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            }],
          },
          {
            _id: 'bb104',
            title: 'Create fabulous grid template for the board',
            comments: [
              {
                _id: 'ZdPnm',
                txt: 'also @etail please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u101',
                fullname: 'Ofir Ezra',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
              },
              {
                _id: 'u102',
                fullname: 'Tamar Millgram',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
              },
              {
                _id: 'u103',
                fullname: 'Etai Levi',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
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
            attachments: ['https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg'],
            memberIds: ['u101', 'u102', 'u103'],
            labelIds: ['l102', 'l103'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u102',
              fullname: 'Tamar Millgram',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
            },
            style: {
              bgColor: '#faa53d',
              type: 'half',
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
            _id: 'tt1010',
            title: 'Define project requirements',
            description:
              'Create a new Git repository for the project. Initialize the repository with the initial project structure and configure branch protection rules.',
            // "archivedAt": 1589983468418,
            style: {
              bgColor: '#f87462',
              type: 'half',
            },
            labelIds: ['l105'],
            members: [],
          },
          {
            _id: 'tt8527',
            title: 'Set up development environment',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u102',
                fullname: 'Tamar Millgram',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
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
            labelIds: ['l102', 'l105', 'l106'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#60c6d2',
              type: 'half',
            },
          },
          {
            _id: 'tt6547',
            title: 'Create GIT repository',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u101',
                fullname: 'Ofir Ezra',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
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
            labelIds: [],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#579dff',
              type: 'half',
            },
          },
          {
            _id: 'tt6598',
            title: 'Feature components',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u101',
                fullname: 'Ofir Ezra',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
              },
              {
                _id: 'u103',
                fullname: 'Etai Levi',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
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
            labelIds: ['l103'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#faa53d',
              type: 'half',
            },
          },
        ],
        style: {},
      },
      {
        _id: '65de45',
        title: 'In Progress',
        tasks: [
          {
            _id: 'tt6352',
            title: 'Bug while adding task',
            description:
              'Create a new Git repository for the project. Initialize the repository with the initial project structure and configure branch protection rules.',
            // "archivedAt": 1589983468418,
            members: [],
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
            labelIds: ['l102', 'l101'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {},
          },
          {
            _id: 'tt97564',
            title: 'Implement user profile functionality',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u103',
                fullname: 'Etai Levi',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
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
            labelIds: ['l106'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#4bce97',
              type: 'half',
            },
          },
        ],
        style: {},
      },
      {
        _id: 'g1052',
        title: 'Code Review',
        tasks: [
          {
            _id: 'tt63485',
            title: 'Review API endpoints',
            description:
              'Create a new Git repository for the project. Initialize the repository with the initial project structure and configure branch protection rules.',
            // "archivedAt": 1589983468418,
            members: [],
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
            labelIds: ['l102'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {},
          },
          {
            _id: 'tt67152',
            title: 'Code refactoring for performance',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u103',
                fullname: 'Etai Levi',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
              },
              {
                _id: 'u101',
                fullname: 'Ofir Ezra',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
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
            labelIds: [],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#f87462',
              type: 'half',
            },
          },
        ],
        style: {},
      },
      {
        _id: 'g6932',
        title: 'Done',
        tasks: [
          {
            _id: 'tt5821',
            title: 'Prepare project documentation',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [

              {
                _id: 'u101',
                fullname: 'Ofir Ezra',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
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
            labelIds: ['l105'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#faa53d',
              type: 'half',
            },
          },
          {
            _id: 'tt8135',
            title: 'Perform load testing',
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
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
              {
                _id: 'Pghdys',
                txt: "I know that, don't worry :)",
                createdAt: 1590999817912,
                byMember: {
                  _id: 'u102',
                  fullname: 'Tamar Millgram',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
                },
              },
              {
                _id: 'ZdPnm',
                txt: 'No problem, good luck!',
                createdAt: 1590999817031,
                byMember: {
                  _id: 'u101',
                  fullname: 'Ofir Ezra',
                  imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956854/ofir-pic_niswho.jpg',
                },
              },
            ],
            members: [
              {
                _id: 'u102',
                fullname: 'Tamar Millgram',
                imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/tamar-pic_ou0jnk.jpg',
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
            labelIds: ['l104', 'l102'],
            dueDate: 16156215584,
            byMember: {
              _id: 'u103',
              fullname: 'Etai Levi',
              imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
            },
            style: {
              bgColor: '#4bbe97',
              type: 'half',
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
          imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1685956855/etai-pic_gxsgfr.jpg',
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
  // {
  //   title: "Krallo La'avod!",
  //   isStarred: false,
  //   groups: [],
  //   style: {
  //     type: 'img',
  //     imgUrl: 'https://unsplash.it/&auto=format&fit=crop&w=1298&q=80',
  //   },
  // },
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
  move,
  getBoardById,
  getGroupByTaskId,
  toggleMemberOnTask,
  getEmptyTask,
  getEmptyAttachment
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

  if (task) {
    // if (task && Object.keys(task).length > 0) {
    task = { ...updatedTask }
    group.tasks[taskIdx] = task
  } else {
    group.tasks.push(updatedTask)
  }

  if (activity) {
    board.activities.unshift(activity)
  }

  const newBoard = await save(board)
  return newBoard
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
  console.log('member', member)
  if (activityType === 'add-member') {
    task.members.push(member)
  } else if (activityType === 'remove-member') {
    const memberIdx = task.members.findIndex((m) => m._id === member._id)
    task.members.splice(memberIdx, 1)
  }

  return task
}

function createBoardFromTemplate() { }

function createTask(title) {
  const task = {
    _id: utilService.makeId(),
    title: title,
    attachments: [getEmptyAttachment()],
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

async function _createBoards() {
  for (const board of boards) {
    await save(board)
  }
}

function getEmptyBoard() {
  return {
    title: 'New board',
    isStarred: false,
    createdAt: Date.now(),
    groups: [createGroup('New group')],
    tasks: [],
    style: {
      type: 'bgColor',
      bgColor: utilService.getRandomColor(),
      // type: 'img',
      // imgUrl: 'https://source.unsplash.com/random/?city,night',
    },
    labels: [],
  }
}

function getEmptyTask() {
  return {
    title: 'Loading...',
  }
}

function getEmptyAttachment() {
  return {
    id: utilService.makeId(),
    imgUrl: ''
  }
}

; (async () => {
  const boards = await query()
  if (boards.length === 0) await _createBoards()
})()
