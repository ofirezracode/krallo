import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BsThreeDots, BsPlusLg, BsWindowStack } from 'react-icons/bs'
import TemplateIcon from '../assets/img/svg/template-icon.svg'

import { TaskList } from './task-list'
import { saveNewTask } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { activityService } from '../services/activity.service'
import { AddCloseButtons } from './add-close-buttons'
import { useCloseOnOutsideClick } from '../customHooks/useCloseOnOutsideClick'
import { useSelector } from 'react-redux'
import { addActivity } from '../store/activity.actions'

export function GroupPreview({ group, onUpdateGroupTitle, provided }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  const [isListening, setIsListening] = useCloseOnOutsideClick(onSubmit, '.edit-title-form', 'group-preview-title')
  const [editedTitle, setEditedTitle] = useState(group.title)
  const scrollRef = useRef(null)


  const { boardId } = useParams()

  function toggleForm(status) {
    setIsListening(status)
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
      console.log('task', task)
      const activity = activityService.createActivity(board._id, 'add', {}, task)
      try {
        await saveNewTask(board, group._id, task, activity)
        await addActivity(activity)
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
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
    toggleForm(false)
    await onUpdateGroupTitle(group._id, editedTitle)
  }


  function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      onSubmit(ev)
    }
  }

  return (
    <article className="group-preview flex column">
      <header className="flex between">
        {!isListening && (
          <h3 className="group-preview-title" onClick={() => toggleForm(true)}>
            {group.title}
          </h3>
        )}
        {isListening && (
          <form className="edit-title-form flex align-center" onSubmit={onSubmit}>
            <input value={editedTitle} onChange={(e) => onTitleChange(e)} autoFocus></input>
          </form>
        )}
        <button className="group-options flex justify-center align-center">
          <BsThreeDots />
        </button>
      </header>

      <TaskList boardId={boardId} tasks={group.tasks} provided={provided}/>

      {!isAddingTask && (
        <section className="add-card-section">
          <div onClick={() => setIsAddingTask(true)} className="add-card flex align-center">
            <BsPlusLg className="icon" />
            <label>Add a card</label>
          </div>
          <button className="card-from-template-button flex justify-center align-center">
            <img src={TemplateIcon} className="template-icon" alt="template-icon" />
          </button>
        </section>
        
      )}
      {isAddingTask && (
        <form onSubmit={onAddTask} className="add-card-form">
          <div className="text-container">
            <textarea onChange={(e) => setNewTaskText(e.target.value)} value={newTaskText}  onKeyPress={handleKeyPress}></textarea>
          </div>
          <AddCloseButtons btnText="Add Card" onClose={onCloseAddCard} isVisible={isAddingTask} scrollRef={scrollRef}/>
          
        </form>
      )}
      <div></div>
    </article>
  )
}
