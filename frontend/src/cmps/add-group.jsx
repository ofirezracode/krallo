import React, { useState } from 'react'

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
      <div className="add-group-controls">
        <button>add</button>
        <button onClick={(e) => toggleInput(e)}>close</button>
      </div>
    </form>
  )
}

export default AddGroup
