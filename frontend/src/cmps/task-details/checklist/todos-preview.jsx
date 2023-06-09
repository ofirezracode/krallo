import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { Checkbox } from '../../checkbox';

export function TodosPreview({ todo, onDeleteTodo, checklist, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const handleFocus = (ev) => ev.target.select()
  const [newTodo, setNewTodo] = useState(todo)

  const isDoneClass = newTodo.isDone ? 'done' : ''

  function onSubmit(ev) {
    ev.preventDefault()
    onEditTodo(checklist._id, newTodo);
    setIsEditing(false)
  }

  function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      onSubmit(ev)
    }
  }

  function toggleEditing(e) {
    setIsEditing((prevIsEditing) => !prevIsEditing)
  }

  function toggleIsDone() {
    setNewTodo((prevTodo) => ({ ...prevTodo, isDone: !prevTodo.isDone }))
    onEditTodo(checklist._id, newTodo);
  }

  return (
    <div>
      {isEditing && (
        <div className='todo-container-form'>
          <Checkbox isChecked={newTodo.isDone} onToggle={toggleIsDone} />
          <form onSubmit={onSubmit}>
            <textarea
              rows='2'
              value={newTodo.title}
              onChange={(ev) => setNewTodo({ ...newTodo, title: ev.target.value })}
              onFocus={handleFocus}
              onKeyPress={handleKeyPress}
            ></textarea>
            <div className='textarea-btns flex'>
              <button className='btn save'>Save</button>
              <button className='x-btn' onClick={toggleEditing}>
                <HiXMark />
              </button>
            </div>
          </form>
        </div>
      )}
      {!isEditing && (
        <div className={`todo-container ${isDoneClass}`}>
          <Checkbox isChecked={newTodo.isDone} onToggle={toggleIsDone} />
          <div onClick={toggleEditing} className='todo flex'>
          <span className={`todo-title ${isDoneClass}`}>{todo.title}</span>
            <span className='x-container'>
              <button className='x-mark' onClick={(e) => onDeleteTodo(todo._id, checklist._id, e)}>
                <HiXMark />
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}


