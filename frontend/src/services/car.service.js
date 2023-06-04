
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'car'


export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg
}
window.cs = carService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(carId) {
    return httpService.get(`car/${carId}`)
}

async function remove(carId) {
    return httpService.delete(`car/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await httpService.put(`car/${car._id}`, car)

    } else {
        savedCar = await httpService.post('car', car)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, { txt })
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function _createBoard() {

}

function _createBoards() {

}

const boards = [{
    _id: "b101",
    title: "Spaceship dev proj",
    isStarred: true,
    createdBy: {
        "_id": "u101",
        "fullname": "Ofir Ezra",
        "imgUrl": "../assets/img/members/ofir-pic.jpg"
    },
    style: {
        type: 'bgColor',
        bgColor: '#DFD8FD'
    },
    labels: [
        {
            "id": "l101",
            "title": "Done!",
            "color": "#4bce97"
        },
        {
            "id": "l102",
            "title": "In Progress",
            "color": "#faa53d"
        },
        {
            "id": "l103",
            "title": "Error",
            "color": "#f87462"
        },
        {
            "id": "l104",
            "title": "Design",
            "color": "#9f8fef"
        },
        {
            "id": "l105",
            "title": "React",
            "color": "#579dff"
        },
        {
            "id": "l106",
            "title": "Backend",
            "color": "#60c6d2"
        },
    ],
    members: [
        {
            "_id": "u101",
            "fullname": "Ofir Ezra",
            "imgUrl": "../assets/img/members/ofir-pic.jpg"
        },
        {
            "_id": "u102",
            "fullname": "Tamar Millgram",
            "imgUrl": "../assets/img/members/tamar-pic.jpg"
        },
        {
            "_id": "u103",
            "fullname": "Etai Levi",
            "imgUrl": "../assets/img/members/etai-pic.jpg"
        },
    ],
    groups: [
        {
            "id": "g101",
            "title": "Backlog",
            // "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Adding a task recording feature",
                    "description": "Let the user to record a task instead of writing it. Also, it will be more productive and comfortable",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @Ofir please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u103",
                                "fullname": "Etai Levi",
                                "imgUrl": "../assets/img/members/etai-pic.jpg"
                            },
                        }
                    ],
                    "byMember": {
                        "_id": "u102",
                        "fullname": "Tamar Millgram",
                        "imgUrl": "../assets/img/members/tamar-pic.jpg"
                    },
                },
                {
                    "id": "c102",
                    "title": "Implement user authentication feature"
                },
                {
                    "id": "c103",
                    "title": "Optimize database queries"
                },
                {
                    "id": "c104",
                    "title": "Implement responsive design"
                },
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Design",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Create wireframes for homepage",
                    // "archivedAt": 1589983468418,
                },
                {
                    "id": "c104",
                    "title": "Create grid template for the board",
                    "description": "Develop the HTML and CSS structure for the homepage. Implement the layout according to the wireframes provided in the Design group.",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @etail please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Ofir Ezra",
                                "imgUrl": "../assets/img/members/ofir-pic.jpg"
                            },
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "New components needed for the feature",
                            "todos": [
                                {
                                    "id": "351Dz",
                                    "title": "Card",
                                    "isDone": false
                                },
                                {
                                    "id": "212jX",
                                    "title": "Button",
                                    "isDone": true
                                },
                                {
                                    "id": "947jQ",
                                    "title": "Menu",
                                    "isDone": false
                                },
                            ]
                        }
                    ],
                    "memberIds": ["u101", "u102", "u103"],
                    "labelIds": ["l101", "l104"],
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u102",
                        "fullname": "Tamar Millgram",
                        "imgUrl": "../assets/img/members/tamar-pic.jpg"
                    },
                    "style": {
                        "bgColor": "#faa53d"
                    }
                }
            ],
            "style": {}
        },
        {
            "id": "g103",
            "title": "To Do",
            "tasks": [
                {
                    "id": "c105",
                    "title": "Create GIT repository",
                    "description": "Create a new Git repository for the project. Initialize the repository with the initial project structure and configure branch protection rules.",
                    // "archivedAt": 1589983468418,
                },
                {
                    "id": "c106",
                    "title": "Create grid template for the board",
                    "description": "Develop the HTML and CSS structure for the homepage. Implement the layout according to the wireframes provided in the Design group.",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "Please, don't forget to do git pull before push",
                            "createdAt": 1590999817874,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Ofir Ezra",
                                "imgUrl": "../assets/img/members/ofir-pic.jpg"
                            },
                        },
                        {
                            "id": "Pghdys",
                            "txt": "I know that, don't worry :)",
                            "createdAt": 1590999817912,
                            "byMember": {
                                "_id": "u102",
                                "fullname": "Tamar Millgram",
                                "imgUrl": "../assets/img/members/tamar-pic.jpg"
                            },
                        },
                        {
                            "id": "ZdPnm",
                            "txt": "No problem, good luck!",
                            "createdAt": 1590999817031,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Ofir Ezra",
                                "imgUrl": "../assets/img/members/ofir-pic.jpg"
                            },
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Add PWA for our app for offline mode.",
                            "todos": [
                                {
                                    "id": "635gW",
                                    "title": "Start by replay the lesson of Stav",
                                    "isDone": true
                                },
                                {
                                    "id": "989lA",
                                    "title": "Implement this option step by step",
                                    "isDone": false
                                },
                                {
                                    "id": "147Vj",
                                    "title": "Check the DevTools",
                                    "isDone": false
                                },
                            ]
                        }
                    ],
                    "memberIds": ["u101", "u102", "u103"],
                    "labelIds": ["l103", "l107"],
                    "dueDate": 16156215584,
                    "byMember": {
                        "_id": "u103",
                        "fullname": "Etai Levi",
                        "imgUrl": "../assets/img/members/etai-pic.jpg"
                    },
                    "style": {
                        "bgColor": "#579dff"
                    }
                }
            ],
            "style": {}
        }
    ],
    activities: [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u103",
                "fullname": "Etai Levi",
                "imgUrl": "../assets/img/members/etai-pic.jpg"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],

    cmpsOrder: ["status-picker", "member-picker", "date-picker"]
},
{
    _id: "b102",
    title: "Another project",
    isStarred: false,
},
{
    _id: "b103",
    title: "Another another project",
    isStarred: false,
},

]