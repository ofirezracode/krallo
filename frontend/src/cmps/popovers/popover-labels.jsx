import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsPencilFill, BsCheck2 } from 'react-icons/bs'
import { colorService } from '../../services/color.service'
import { utilService } from '../../services/util.service'
import { PopoverCmpHeader } from './popover-cmp-header'
import { LabelEditor } from './popover-labels/label-editor'
import { Checkbox } from '../checkbox'

export function PopoverLabels({ task, labels, onClose, onLabelChange, onLabelEdit, onLabelDelete }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const [taskLabels, setTaskLabels] = useState(task.labelIds ? [...task.labelIds] : [])
  const [searchTerm, setSearchTerm] = useState('')
  const [boardLabels, setBoardLabels] = useState([...labels])
  const [filteredBoardLabels, setFilteredBoardLabels] = useState([...labels])
  const [popoverState, setPopoverState] = useState('labels')
  const [chosenLabel, setChosenLabel] = useState({ _id: '', color: { code: '', varName: '', colorTitle: '' }, title: '' })

  //This one is for when you add a new label while filtered
  //With this it will take into account the new label in its filtering
  useEffect(() => {
    const filteredLabels = [...boardLabels]
    setFilteredBoardLabels(filterLabels(filteredLabels))
  }, [boardLabels])

  useEffect(() => {
    setFilteredBoardLabels(filterLabels(boardLabels))
  }, [searchTerm])

  function filterLabels(labels) {
    const lowerCaseTerm = searchTerm.toLowerCase()
    return labels.filter(
      (label) => label.title.toLowerCase().includes(lowerCaseTerm) || label?.color?.colorTitle.toLowerCase().includes(lowerCaseTerm)
    )
  }

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
    onLabelChange(board, newLabelIds)
  }

  function onClickEditLabel(labelId, label, title, target) {
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
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search labels..." />
          <p>Labels</p>
          <ul className="labels-list flex column">
            {filteredBoardLabels.map((label) => {
              const isLabelChecked = taskLabels ? taskLabels.some((labelId) => labelId === label._id) : false

              let labelStyle = { backgroundColor: '#091e420f' }
              if (label.color) labelStyle = { backgroundColor: label.color.code }

              let colorClass = 'light-background'
              if (colorService.isColorDark(labelStyle.backgroundColor)) colorClass = 'dark-background'

              const labelTitle = label.title ? label.title : ''

              return (
                <li key={label._id}>
                  <Checkbox isChecked={isLabelChecked} onToggle={onClickLabel} onClickProps={label._id} />
                  <button onClick={(e) => onClickLabel(e, label._id)} className={`label-color ${colorClass}`} style={labelStyle}>
                    <label>{labelTitle}</label>
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
