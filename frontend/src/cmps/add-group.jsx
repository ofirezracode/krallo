import React, { useState } from 'react'
import { AddCloseButtons } from './add-close-buttons'
import { BsPlusLg } from 'react-icons/bs'
import { boardService } from '../services/board.service.local'
import { useCloseOnOutsideClick } from '../customHooks/useCloseOnOutsideClick'

export function AddGroup({ onAddGroup }) {
  const [newTitle, setNewTitle] = useState('')

  const [isEditing, setIsEditing] = useCloseOnOutsideClick(toggleInput, '.add-group-input', 'open-form-button')

  function toggleInput(e) {
    if (e) {
      e.preventDefault()
    }
    setIsEditing((prev) => !prev)
  }

  async function onSubmit(e) {
    e.preventDefault()
    const newGroup = boardService.createGroup()
    newGroup.title = newTitle
    await onAddGroup(newGroup)
  }

  return (
    <form onSubmit={onSubmit} className={`add-group ${isEditing ? 'visible' : ''}`}>
      {!isEditing && (
        <button onClick={(e) => toggleInput(e)} className="open-form-button flex align-center">
          <BsPlusLg className="icon" />
          Add another list
        </button>
      )}
      {isEditing && (
        <input
          className="add-group-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter list title..."
        ></input>
      )}
      <AddCloseButtons btnText={'Add list'} onClose={(e) => toggleInput(e)} isVisible={isEditing} />
    </form>
  )
}