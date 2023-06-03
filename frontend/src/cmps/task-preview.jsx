import React from 'react'
import { useNavigate } from 'react-router'

function TaskPreview({ boardId, task }) {

  const navigate = useNavigate()

  let previewStyle = {}
  if (task.style) {
    if (task.style.bgColor) {
      previewStyle = { backgroundColor: task.style.bgColor }
    }
  }

  function onOpenTaskDetails() {
    navigate(`/board/${boardId}/${task._id}`)
  }

  return (
    <article className="task-preview" onClick={onOpenTaskDetails}>
      {Object.keys(previewStyle).length > 0 && <div className="preview-cover" style={previewStyle}></div>}
      <section className="preview-container">
        <h4>{task.title}</h4>
      </section>
    </article>
  )
}

export default TaskPreview
