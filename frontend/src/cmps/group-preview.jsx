import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { BsThreeDots, BsPlusLg, BsWindowStack } from 'react-icons/bs'

import TaskList from './task-list'
import { saveTask } from '../store/board.actions'
import { boardService } from '../services/board.service.local'
import { activityService } from '../services/activity.service'
import AddCloseButtons from './add-close-buttons'

function GroupPreview({ group, onUpdateGroupTitle }) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(group.title)

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

  function onTitleChange(e) {
    setEditedTitle(e.target.value)
  }

  async function onTitleEdit(e) {
    e.preventDefault()

    await onUpdateGroupTitle(group._id, editedTitle)

    setIsEditingTitle(false)
  }

  return (
    <article className="group-preview flex column">
      <header className="flex between">
        {!isEditingTitle && <h3 onClick={() => setIsEditingTitle(true)}>{group.title}</h3>}
        {isEditingTitle && (
          <form className="flex align-center" onSubmit={onTitleEdit}>
            <input value={editedTitle} onChange={(e) => onTitleChange(e)}></input>
          </form>
        )}
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
          <AddCloseButtons btnText="Add Card" onClose={onCloseAddCard} isVisible={isAddingTask} />
        </form>
      )}
      <div></div>
    </article>
  )
}

export default GroupPreview
