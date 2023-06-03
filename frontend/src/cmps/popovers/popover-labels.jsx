import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'

function PopoverLabels(labels) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="popover-labels">
      <input type="text" value={searchTerm} onChange={setSearchTerm} />
      <p>Labels</p>
      <ul className="labels-list">
        {labels.map((label) => {
          const labelStyle = { backgroundColor: label.color }
          return (
            <li key={label._id}>
              <label class="container">
                One
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
                <div className="label-color" style={labelStyle}>
                  {label.title ? label.title : ''}
                </div>
              </label>
              <button className="edit-icon-btn">
                <BsPencil className="edit-icon" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PopoverLabels
