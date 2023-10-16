import React, { useRef } from 'react'
import { TaskPreview } from './task-preview'
import { Draggable } from 'react-beautiful-dnd'

export function TaskList({ boardId, tasks, onDeleteTask, provided, lastTaskRef }) {



  return (
    <>
      <ul className="task-list clean-list flex column" ref={lastTaskRef}>
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
                <TaskPreview boardId={boardId} taskToPrev={task} onDeleteTask={onDeleteTask} />
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>

    </>
  )
}
