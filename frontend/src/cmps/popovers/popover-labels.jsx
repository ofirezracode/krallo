import React, { useState } from 'react'
import { BsPencilFill, BsCheck2 } from 'react-icons/bs'
import { PopoverCmpHeader } from './popover-cmp-header'
import { LabelEditor } from './popover-labels/label-editor'
import { utilService } from '../../services/util.service'

export function PopoverLabels({ task, labels, onClose, onLabelChange, onLabelEdit, onLabelDelete }) {
  // const [searchTerm, setSearchTerm] = useState('')
  const [taskLabels, setTaskLabels] = useState(task.labelIds ? [...task.labelIds] : [])
  const [boardLabels, setBoardLabels] = useState([...labels])
  const [popoverState, setPopoverState] = useState('labels')
  const [chosenLabel, setChosenLabel] = useState({ _id: '', color: { code: '', varName: '', colorTitle: '' }, title: '' })

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

  function onClickEditLabel(labelId, label, title, target) {
    console.log('label', label)
    setChosenLabel({ _id: labelId, color: label?.color, title })
    navigateToState(target)
  }

  function onSave(editedLabel) {
    const newBoardLabels = [...boardLabels]
    let labelToEditIndex = newBoardLabels.findIndex((boardLabel) => boardLabel._id === editedLabel._id)
    if (labelToEditIndex === -1) {
      editedLabel._id = utilService.makeId()
      labelToEditIndex = newBoardLabels.length
    }
    newBoardLabels.splice(labelToEditIndex, 1, editedLabel)
    setBoardLabels(newBoardLabels)
    onLabelEdit(newBoardLabels)
    navigateToState('labels')
    setChosenLabel({ _id: '', color: { code: '', varName: '', colorTitle: '' }, title: '' })
  }

  function onEditedLabelDelete() {
    const newBoardLabels = [...boardLabels]
    const labelToDeleteIndex = newBoardLabels.findIndex((boardLabel) => boardLabel._id === chosenLabel._id)
    const deletedLabel = newBoardLabels.splice(labelToDeleteIndex, 1)[0]
    setBoardLabels(newBoardLabels)
    onLabelDelete(newBoardLabels, deletedLabel)
    navigateToState('labels')
    setChosenLabel({ _id: '', color: { code: '', varName: '', colorTitle: '' }, title: '' })
  }

  function navigateToState(target) {
    setPopoverState(target)
  }

  let title = ''
  let returnTarget = ''
  if (popoverState === 'labels') {
    title = 'Labels'
  } else if (popoverState === 'edit') {
    returnTarget = 'labels'
    title = 'Edit label'
  } else if (popoverState === 'add') {
    returnTarget = 'labels'
    title = 'Create label'
  } else if (popoverState === 'delete') {
    returnTarget = 'edit'
    title = 'Delete label'
  }

  return (
    <section className="popover-labels">
      <PopoverCmpHeader title={title} onClose={onClose} onReturn={popoverState !== 'labels' ? () => navigateToState(returnTarget) : ''} />
      {popoverState === 'labels' && (
        <div className="labels">
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
                  <button onClick={() => onClickEditLabel(label._id, label, labelTitle, 'edit')} className="edit-icon-btn flex center">
                    <BsPencilFill className="edit-icon" />
                  </button>
                </li>
              )
            })}
          </ul>
          <button onClick={() => navigateToState('add')} className="btn-add flex center">
            Create a new label
          </button>
        </div>
      )}
      {popoverState === 'edit' && <LabelEditor isAdd={false} chosenLabel={chosenLabel} onSave={onSave} navigateToState={navigateToState} />}
      {popoverState === 'add' && <LabelEditor isAdd={true} onSave={onSave} navigateToState={navigateToState} />}
      {popoverState === 'delete' && (
        <div className="delete-label">
          <p>
            This will remove this label from all cards.
            <br />
            There is no undo.
          </p>
          <button onClick={onEditedLabelDelete} className="btn-delete">
            Delete
          </button>
        </div>
      )}
    </section>
  )
}
