import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { BsThreeDots, BsPlusLg, BsWindowStack } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'

import TaskList from './task-list'
import { saveTask } from '../store/board.actions'
import { boardService } from '../services/board.service.local'
import { activityService } from '../services/activity.service'

function GroupPreview({ group }) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  const { boardId } = useParams()

  function onCloseAddCard(e) {
    e.preventDefault()
    setIsAddingTask(false)
    setNewTaskText('')
  }

  async function onAddTask(e) {
    e.preventDefault()
    if (newTaskText.trim().length > 0) {
      const task = boardService.createTask(newTaskText)
      const activity = activityService.createActivity('add', {}, task)
      await saveTask(boardId, group._id, task, activity)
    }
    setIsAddingTask(false)
    setNewTaskText('')
  }

  return (
    <article className="group-preview">
      <header className="flex between">
        <h3>{group.title}</h3>
        <button className="group-options flex justify-center align-center">
          <BsThreeDots />
        </button>
      </header>

      <TaskList tasks={group.tasks}></TaskList>

      {!isAddingTask && (
        <section className="add-card-section">
          <div onClick={() => setIsAddingTask(true)} className="add-card flex align-center">
            <BsPlusLg className="icon" />
            <label>Add a card</label>
          </div>
          <button className="card-from-template-button flex justify-center align-center">
            <BsWindowStack className="card-from-template-icon" />
          </button>
        </section>
      )}
      {isAddingTask && (
        <form onSubmit={onAddTask} className="add-card-form">
          <div className="text-container">
            <textarea onChange={(e) => setNewTaskText(e.target.value)} value={newTaskText}></textarea>
          </div>
          <div className="button-container flex align-center">
            <button className="add-button">Add Card</button>
            <button onClick={onCloseAddCard} className="close-button flex align-center">
              <HiXMark />
            </button>
          </div>
        </form>
      )}
      <div></div>
    </article>
  )
}

export default GroupPreview
