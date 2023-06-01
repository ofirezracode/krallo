import React from 'react'
import TaskPreview from './task-preview'

function TaskList({ tasks }) {
  return (
    <ul className="task-list clean-list flex column">
      {tasks.map((task) => (
        <li key={task._id}>
          <TaskPreview task={task}></TaskPreview>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
