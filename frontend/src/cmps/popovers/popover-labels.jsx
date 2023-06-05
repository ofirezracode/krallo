import React, { useState } from 'react'
import { BsPencil, BsCheck2 } from 'react-icons/bs'

export function PopoverLabels({ task, labels, onLabelChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [taskLabels, setTaskLabels] = useState([...task.labelIds])

  function onClickLabel(e, labelId) {
    e.stopPropagation()

    const newTaskLabels = [...taskLabels]
    const labelIdx = newTaskLabels.findIndex((taskLabelId) => taskLabelId === labelId)
    let newLabelIds = newTaskLabels.slice()
    if (labelIdx >= 0) {
      newLabelIds.splice(labelIdx, 1)
    } else {
      newLabelIds.push(labelId)
    }
    setTaskLabels(newLabelIds)
    onLabelChange(newLabelIds)
  }

  return (
    <div className="popover-labels">
      <input type="text" value={searchTerm} onChange={setSearchTerm} />
      <p>Labels</p>
      <ul className="labels-list flex column">
        {labels.map((label) => {
          const isLabelChecked = taskLabels ? taskLabels.some((labelId) => labelId === label._id) : false
          const labelStyle = { backgroundColor: label.color }
          return (
            <li key={label._id}>
              <label className="checkbox-container flex center">
                <input onChange={(e) => onClickLabel(e, label._id)} type="checkbox" checked={isLabelChecked ? 'checked' : ''} />
                <span className="checkmark flex center"></span>
                {isLabelChecked && <BsCheck2 className="check-icon" />}
              </label>
              <button onClick={(e) => onClickLabel(e, label._id)} className="label-color" style={labelStyle}>
                {label.title ? label.title : ''}
              </button>
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
