import React, { useEffect, useRef, useState } from 'react'
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

  const [requiresSubmit, setRequiresSubmit] = useState(false)

  const formRef = useRef(null)

  const { boardId } = useParams()

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!e.target.closest('.edit-title-form') && !e.target.classList.contains('group-preview-title')) {
        setRequiresSubmit(true)
      }
    }

    if (isEditingTitle) {
      document.addEventListener('click', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isEditingTitle])

  useEffect(() => {
    if (requiresSubmit) {
      onSubmit()
      setRequiresSubmit(false)
    }
  }, [requiresSubmit])

  function toggleForm(status) {
    setIsEditingTitle(status)
  }

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
      try {
        await saveTask(boardId, group._id, task, activity)
      } catch (err) {
        console.log('err', err)
      }
    }
    setIsAddingTask(false)
    setNewTaskText('')
  }

  function onTitleChange(e) {
    setEditedTitle(e.target.value)
  }

  async function onSubmit(e) {
    if (e) {
      e.preventDefault()
    }
    toggleForm(false)
    await onUpdateGroupTitle(group._id, editedTitle)
  }

  return (
    <article className="group-preview flex column">
      <header className="flex between">
        {!isEditingTitle && (
          <h3 className="group-preview-title" onClick={() => toggleForm(true)}>
            {group.title}
          </h3>
        )}
        {isEditingTitle && (
          <form ref={formRef} className="edit-title-form flex align-center" onSubmit={onSubmit}>
            <input value={editedTitle} onChange={(e) => onTitleChange(e)} autoFocus></input>
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
