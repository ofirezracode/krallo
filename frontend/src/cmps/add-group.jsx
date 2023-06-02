import React, { useState } from 'react'
import AddCloseButtons from './add-close-buttons'

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
        <button onClick={(e) => toggleInput(e)} className="open-form-button">
          test
        </button>
      )}
      {isAdding && <input placeholder="new group"></input>}
      <AddCloseButtons btnText={'Add another list'} onClose={(e) => toggleInput(e)} isVisible={isAdding} />
    </form>
  )
}

export default AddGroup
