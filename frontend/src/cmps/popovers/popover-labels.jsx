import React, { useState } from 'react'
import { BsPencilFill, BsCheck2 } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'
import { PopoverCmpHeader } from './popover-cmp-header'
import { ColorPalette } from '../color-palette'

export function PopoverLabels({ task, labels, onClose, onLabelChange, onLabelEdit }) {
  // const [searchTerm, setSearchTerm] = useState('')
  const [taskLabels, setTaskLabels] = useState([...task.labelIds])
  const [boardLabels, setBoardLabels] = useState([...labels])
  const [isEditing, setIsEditing] = useState(false)
  const [editedLabel, setEditedLabel] = useState({ _id: '', color: { code: '', varName: '', colorTitle: '' }, title: '' })

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

  function onClickEditLabel(labelId, label, title) {
    setIsEditing((prev) => !prev)
    setEditedLabel({ _id: labelId, color: label?.color, title })
  }

  function onLabelEdited(clrEdit) {
    const color = clrEdit.color ? clrEdit.color : editedLabel.color
    const title = clrEdit.title ? clrEdit.title : editedLabel.title
    setEditedLabel((prev) => ({ ...prev, color, title }))
  }

  function onEditedLabelSave() {
    const newBoardLabels = [...boardLabels]
    const labelToEditIndex = newBoardLabels.findIndex((boardLabel) => boardLabel._id === editedLabel._id)
    newBoardLabels.splice(labelToEditIndex, 1, editedLabel)
    setBoardLabels(newBoardLabels)
    onLabelEdit(newBoardLabels)
    setIsEditing(false)
  }

  return (
    <section>
      <PopoverCmpHeader title={!isEditing ? 'Labels' : 'Edit label'} onClose={onClose} onReturn={isEditing ? onClickEditLabel : ''} />
      {!isEditing && (
        <div className="popover-labels">
          {/* <input type="text" value={searchTerm} onChange={setSearchTerm} /> */}
          <p>Labels</p>
          <ul className="labels-list flex column">
            {boardLabels.map((label) => {
              const isLabelChecked = taskLabels ? taskLabels.some((labelId) => labelId === label._id) : false
              const labelStyle = { backgroundColor: label.color.code }
              const labelTitle = label.title ? label.title : ''
              return (
                <li key={label._id}>
                  <label className="checkbox-container flex center">
                    <input onChange={(e) => onClickLabel(e, label._id)} type="checkbox" checked={isLabelChecked ? 'checked' : ''} />
                    <span className="checkmark flex center"></span>
                    {isLabelChecked && <BsCheck2 className="check-icon" />}
                  </label>
                  <button onClick={(e) => onClickLabel(e, label._id)} className="label-color" style={labelStyle}>
                    {labelTitle}
                  </button>
                  <button onClick={() => onClickEditLabel(label._id, label, labelTitle)} className="edit-icon-btn flex center">
                    <BsPencilFill className="edit-icon" />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {isEditing && (
        <div className="edit-labels">
          <div className="edited-label-preview">
            <div
              className={`label-color format-${editedLabel.color.varName.substring(1)}`}
              style={{ backgroundColor: editedLabel.color.code }}
            >
              {editedLabel.title}
            </div>
          </div>
          <h4 className="labels-title">Title</h4>
          <input
            type="text"
            value={editedLabel.title}
            onChange={(e) => onLabelEdited({ title: e.target.value })}
            placeholder="Label title"
          />
          <h4 className="labels-title">Select a color</h4>
          <ColorPalette onColorChange={onLabelEdited} activeClr={editedLabel.color.code} />
          <button className="btn-remove flex center">
            <HiXMark />
            Remove color
          </button>
          <hr />
          <div className="buttons-section flex between">
            <button onClick={onEditedLabelSave} className="btn-save">
              Save
            </button>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
      )}
    </section>
  )
}
