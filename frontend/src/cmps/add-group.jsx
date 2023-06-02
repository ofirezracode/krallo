import React, { useState } from 'react'
import AddCloseButtons from './add-close-buttons'
import { BsPlusLg } from 'react-icons/bs'

function AddGroup() {
  const [isAdding, setIsAdding] = useState(false)

  function toggleInput(e) {
    e.preventDefault()
    setIsAdding((prev) => !prev)
  }

  const formStyle = isAdding ? { height: '32px' } : {}
  return (
    <form className={`add-group ${isAdding ? 'visible' : ''}`}>
      {!isAdding && (
        <button onClick={(e) => toggleInput(e)} className="open-form-button flex align-center">
          <BsPlusLg className="icon" />
          Add another list
        </button>
      )}
      {isAdding && <input placeholder="Enter list title..."></input>}
      <AddCloseButtons btnText={'Add list'} onClose={(e) => toggleInput(e)} isVisible={isAdding} />
    </form>
  )
}

export default AddGroup
