import { useState, useEffect } from 'react'
import DescIcon from '../../assets/img/svg/desc-icon.svg'

export function TaskDescription({ task }) {
  const handleFocus = (ev) => ev.target.select()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(task && task.description ? task.description : '')
  useEffect(() => {
    if (task && task.description) {
      setDescription(task.description)
    }
  }, [task])
  if (!task) return <div></div>

  function toggleEditing() {
    setIsEditing(!isEditing)
  }
  console.log('description', description)
  return (
    <section className="task-description">
      {description.length > 0 && (
        <div className="desc-title flex align-center">
          <img src={DescIcon} alt="desc-icon" />
          <h3>Description</h3>
          <button className="btn">Edit</button>
        </div>
      )}

      <p>{description}</p>
    </section>
  )
}
