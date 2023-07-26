import { useState, useEffect } from 'react'
import DescIcon from '../../assets/img/svg/desc-icon.svg'

export function TaskDescription({ task, onDescriptionUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(task && task.description ? task.description : '')
  const [updatedDescription, setUpdatedDescription] = useState('')

  useEffect(() => {
    if (task && task.description) {
      setDescription(task.description)
      setUpdatedDescription(task.description)
    }
  }, [task])
  if (!task) return <div></div>

  function toggleEditing() {
    setIsEditing(!isEditing)
  }

  function onSaveDescription() {
    setDescription(updatedDescription)
    onDescriptionUpdate(updatedDescription)
    // setIsEditing(false)
    toggleEditing()
  }

  function onCancel() {
    setUpdatedDescription(description)
    // setIsEditing(false)
    toggleEditing()
  }

  return (
    <section className="task-description flex column">
      <div className="desc-title flex align-center">
        <img src={DescIcon} alt="desc-icon" />
        <h3>Description</h3>
        {!isEditing && description &&
          (<button onClick={toggleEditing} className="btn">
            Edit
          </button>)}
      </div>
      {!isEditing && !description && (
        <button onClick={toggleEditing} className="add-description flex">
          <p>Add a more detailed description...</p>
        </button>
      )}
      {isEditing && (
        <div className="enter-description-section">
          <textarea
            onChange={(e) => setUpdatedDescription(e.target.value)}
            value={updatedDescription}
            placeholder="Enter a description..."
          />
          <div className="btn-sections">
            <button onClick={onSaveDescription} className="btn-save">
              Save
            </button>
            <button onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
      {!isEditing && description.length > 0 && <p onClick={toggleEditing}>{description}</p>}
    </section>
  )
}
