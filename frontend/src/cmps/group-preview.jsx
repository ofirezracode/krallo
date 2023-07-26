import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BsThreeDots, BsPlusLg, BsWindowStack } from 'react-icons/bs'
import TemplateIcon from '../assets/img/svg/template-icon.svg'

import { TaskList } from './task-list'
import { saveNewTask, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { activityService } from '../services/activity.service'
import { AddCloseButtons } from './add-close-buttons'
import { useCloseOnOutsideClick } from '../customHooks/useCloseOnOutsideClick'
import { useSelector } from 'react-redux'
import { addActivity } from '../store/activity.actions'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'

export function GroupPreview({ group, onUpdateGroupTitle, onDeleteGroup, provided }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  const [isListening, setIsListening] = useCloseOnOutsideClick(onSubmit, '.edit-title-form', 'group-preview-title')
  const [editedTitle, setEditedTitle] = useState(group.title)
  const scrollRef = useRef(null)


  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()
  const groupPreview = useRef()

  const { boardId } = useParams()

  function toggleForm(status) {
    setIsListening(status)
  }

  function onOpenPopover(e, props, type) {
    closePopover()
    props.refElement = groupPreview.current
    setAddedProps(props)
    openPopover(e, type)
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

  async function onDeleteTask(taskId) {
    const newGroup = { ...group }
    const taskIdx = await newGroup.tasks.findIndex(task => taskId === task._id)
    newGroup.tasks.splice(taskIdx, 1)
    try {
      await updateBoard(board)
    } catch (err) {
      console.log('err', err)
    }
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
      <header className="group-header flex between">
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
        <button className="group-options flex justify-center align-center" ref={groupPreview} onClick={(e) => onOpenPopover(e, { group, onDeleteGroup }, 'group-actions')}>
          <BsThreeDots />
        </button>
      </header>

      <TaskList boardId={boardId} tasks={group.tasks} onDeleteTask={onDeleteTask} provided={provided} />

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
            <textarea onChange={(e) => setNewTaskText(e.target.value)} value={newTaskText} onKeyPress={handleKeyPress}></textarea>
          </div>
          <AddCloseButtons btnText="Add Card" onClose={onCloseAddCard} isVisible={isAddingTask} scrollRef={scrollRef} />

        </form>
      )}
      <div></div>
      <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />
    </article>
  )
}
