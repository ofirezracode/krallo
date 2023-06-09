import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { saveTask, setLabelsOpen } from '../store/board.actions'
import { BsTextParagraph, BsCheck2Square, BsChat, BsPaperclip, BsClock } from 'react-icons/bs'
import { utilService } from '../services/util.service'
import { IndicatorDueDate } from './task-preview-indicators/indicator-due-date'
import { Indicator } from './task-preview-indicators/indicator'
import { UsersList } from './users-list'
import { colorService } from '../services/color.service'

export function TaskPreview({ boardId, taskToPrev }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const labelsOpen = useSelector((storeState) => storeState.boardModule.labelsOpen)

  const [task, setTask] = useState({ ...taskToPrev })
  const [boardLabels, setBoardLabels] = useState(board.labels)

  const navigate = useNavigate()

  function onLabelClick(e) {
    e.stopPropagation()
    setLabelsOpen(!labelsOpen)
  }

  useEffect(() => setBoardLabels(board.labels), [board])
  useEffect(() => {
    if (taskToPrev) setTask(taskToPrev)
  }, [taskToPrev])

  function onOpenTaskDetails() {
    navigate(`/board/${boardId}/${task._id}`)
  }

  async function onDateClick(e) {
    e.stopPropagation()
    try {
      const newDueDate = { ...task.dueDate, isCompleted: !task.dueDate.isCompleted }
      const updatedTask = { ...task, dueDate: newDueDate }
      console.log('updatedTask', updatedTask)
      await saveTask(board, updatedTask)
    } catch (err) {
      console.log('err', err)
    }
  }

  let previewStyle = {}
  let typeClass = ''
  if (task.style) {
    if (task.style.bgColor) {
      previewStyle = { backgroundColor: task.style.bgColor }
      typeClass = task.style.type === 'full' ? 'full' : 'half'
    }
  }

  const checklistsTodos = task.checklists?.reduce(
    (acc, checklist) => {
      acc.total += checklist.todos.length
      acc.finished += checklist.todos.reduce((acc, todo) => {
        acc += todo.isDone
        return acc
      }, 0)
      return acc
    },
    { total: 0, finished: 0 }
  )

  let colorClass = 'light-background'
  if (previewStyle.backgroundColor) {
    if (colorService.isColorDark(previewStyle.backgroundColor)) colorClass = 'dark-background'
  } else {
    colorClass = ''
  }

  return (
    <article className="task-preview" onClick={onOpenTaskDetails}>
      {previewStyle.backgroundColor && (
        <div className={`preview-cover flex ${typeClass} ${colorClass}`} style={previewStyle}>
          {typeClass === 'full' && <h4>{task.title}</h4>}
        </div>
      )}
      {typeClass !== 'full' && (
        <section className="preview-container">
          {/* labels */}
          {task.labelIds && boardLabels.length > 0 && (
            <ul className="labels flex clean-list">
              {task.labelIds.map((labelId, i) => {
                const label = boardLabels.find((boardLabel) => boardLabel._id === labelId)
                if (!label.color) return ''
                const labelStyle = { backgroundColor: label.color.code }
                const labelText = labelsOpen ? label.title : ''
                return (
                  <li className={`flex center ${labelsOpen ? 'open' : ''}`} key={i}>
                    <button onClick={(e) => onLabelClick(e)} className="" style={labelStyle}>
                      {labelText}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
          <h4>{task.title}</h4>

          <section className="preview-details flex">
            {/* indicators */}
            <div className="task-indicators flex">
              <ul className="indicators clean-list">
                {task.dueDate && task.dueDate.dueDate && <IndicatorDueDate dueDate={task.dueDate} onDateClick={onDateClick} />}
                {task.description && <Indicator type="description" />}
                {task.comments && task.comments.length > 0 && <Indicator type="comments" txt={task.comments.length} />}
                {task.attachments && task.attachments.length > 0 && <Indicator type="attachments" txt={task.attachments.length} />}
                {task.checklists && task.checklists.length > 0 && (
                  <Indicator type="checklists" txt={`${checklistsTodos.finished}/${checklistsTodos.total}`} />
                )}
              </ul>
            </div>

            {/* users */}
            <div className="members-list-container">
              <UsersList users={task.members} size="xsmall" hover="gray" />
            </div>
          </section>
        </section>
      )}
    </article>
  )
}
