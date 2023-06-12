import React, { useState, useRef } from 'react'
import { AddCloseButtons } from './add-close-buttons'
import { BsPlusLg } from 'react-icons/bs'
import { boardService } from '../services/board.service'
import { useCloseOnOutsideClick } from '../customHooks/useCloseOnOutsideClick'

export function AddGroup({ onAddGroup }) {
  const [newTitle, setNewTitle] = useState('')
  const [isListening, setIsListening] = useCloseOnOutsideClick(toggleInput, '.add-group', 'open-form-button')
  const groupRef = useRef(null) // Ref for the group container element

  function toggleInput(e) {
    if (e) {
      e.preventDefault()
    }
    setIsListening((prev) => !prev)
  }

  async function onSubmit(e) {
    e.preventDefault()
    const newGroup = boardService.createGroup()
    newGroup.title = newTitle
    await onAddGroup(newGroup)
    setNewTitle('')
    groupRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
    <form onSubmit={onSubmit} className={`add-group ${isListening ? 'visible' : ''}` }>
      {!isListening && (
        <button onClick={(e) => toggleInput(e)} className="open-form-button flex align-center">
          <BsPlusLg className="icon" />
          Add another list
        </button>
      )}
      {isListening && (
        <input
          className="add-group-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter list title..."
        ></input>
      )}
      <AddCloseButtons btnText={'Add list'} onClose={(e) => toggleInput(e)} isVisible={isListening} />
    </form>
      <div ref={groupRef}></div> {/* Empty div to serve as a reference for the group container */}
      </>
  )
}

