import React, { useState } from 'react'
import AddCloseButtons from './add-close-buttons'
import { BsPlusLg } from 'react-icons/bs'
import { boardService } from '../services/board.service.local'
import { addBoard } from '../store/board.actions'

function AddGroup({ onAddGroup }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  function toggleInput(e) {
    e.preventDefault()
    setIsAdding((prev) => !prev)
  }

  async function onSubmit(e) {
    e.preventDefault()
    const newGroup = boardService.createGroup()
    newGroup.title = newTitle
    await onAddGroup(newGroup)
  }

  return (
    <form onSubmit={onSubmit} className={`add-group ${isAdding ? 'visible' : ''}`}>
      {!isAdding && (
        <button onClick={(e) => toggleInput(e)} className="open-form-button flex align-center">
          <BsPlusLg className="icon" />
          Add another list
        </button>
      )}
      {isAdding && <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter list title..."></input>}
      <AddCloseButtons btnText={'Add list'} onClose={(e) => toggleInput(e)} isVisible={isAdding} />
    </form>
  )
}

export default AddGroup
