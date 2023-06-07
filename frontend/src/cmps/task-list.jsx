import React from 'react'
import { TaskPreview } from './task-preview'
import { Draggable } from 'react-beautiful-dnd'

export function TaskList({ boardId, tasks, provided }) {
  return (
    <ul className="task-list clean-list flex column">
      {tasks.map((task, idx) => (
        <Draggable key={task._id} draggableId={task._id} index={idx}>
          {(provided, snapshot) => (
            <li
              key={task._id}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                opacity: snapshot.isDragging ? '0.5' : '1',
              }}
            >
              <TaskPreview boardId={boardId} taskToPrev={task} />
            </li>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </ul>
  )
}
