import Home from './pages/home.jsx'
import BoardIndex from './pages/board-index.jsx'
import Workspaces from './pages/workspaces.jsx'
import TaskDetails from './cmps/task-details.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: <Home />,
    label: 'Home ',
  },
  {
    path: '/board',
    component: <BoardIndex />,
    label: 'Board',
    routes: [
      {
        path: '/board/:taskId',
        component: <TaskDetails />,
        label: 'Task Details',
      },
    ],
  },
  {
    path: '/workspaces',
    component: <Workspaces />,
    label: 'Workspaces',
  },
]

export default routes
