import React, { useEffect, useState } from 'react'
import { ColorPalette } from '../../color-palette'
import { HiXMark } from 'react-icons/hi2'
import { colorService } from '../../../services/color.service'

export function LabelEditor({ isAdd, onSave, navigateToState, chosenLabel }) {
  const [editedLabel, setEditedLabel] = useState({
    _id: '',
    color: { code: '#f87462', varName: '$red-subtle', colorTitle: 'Red' },
    title: '',
  })
  useEffect(() => {
    if (chosenLabel) {
      setEditedLabel(chosenLabel)
    }
  }, [chosenLabel])

  function onLabelEdited(clrEdit) {
    const color = clrEdit.color ? clrEdit.color : editedLabel.color
    const title = clrEdit.title !== undefined ? clrEdit.title : editedLabel.title
    setEditedLabel((prev) => ({ ...prev, color, title }))
  }

  function onRemoveColor() {
    setEditedLabel((prev) => ({ ...prev, color: null }))
  }

  const previewStyle = editedLabel.color ? { backgroundColor: editedLabel.color.code } : {}

  let colorClass = 'light-background'
  if (editedLabel.color) {
    if (colorService.isColorDark(editedLabel.color.code)) colorClass = 'dark-background'
  } else {
    colorClass = ''
  }

  return (
    <div className="label-editor">
      <div className="edited-label-preview">
        <div className={`label-color ${colorClass}`} style={previewStyle}>
          <label>{editedLabel.title}</label>
        </div>
      </div>
      <h4 className="labels-title">Title</h4>
      <input type="text" value={editedLabel.title} onChange={(e) => onLabelEdited({ title: e.target.value })} />
      <h4 className="labels-title">Select a color</h4>
      <ColorPalette onColorChange={onLabelEdited} activeClr={editedLabel.color} />
      <button onClick={onRemoveColor} className={`btn-remove flex center ${editedLabel.color ? '' : 'disabled'}`}>
        <HiXMark />
        Remove color
      </button>
      <hr />
      {!isAdd && (
        <div className="buttons-section flex between">
          <button onClick={() => onSave(editedLabel)} className="btn-save">
            Save
          </button>
          <button onClick={() => navigateToState('delete')} className="btn-delete">
            Delete
          </button>
        </div>
      )}
      {isAdd && (
        <button onClick={() => onSave(editedLabel)} className="btn-create">
          Create
        </button>
      )}
    </div>
  )
}
