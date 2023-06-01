import React from 'react'

function TaskPreview({ task }) {
  let previewStyle = {}
  if (task.style) {
    if (task.style.bgColor) {
      previewStyle = { backgroundColor: task.style.bgColor }
    }
  }

  return (
    <article className="task-preview">
      {Object.keys(previewStyle).length > 0 && <div className="preview-cover" style={previewStyle}></div>}
      <section className="preview-container">
        <h4>{task.title}</h4>
      </section>
    </article>
  )
}

export default TaskPreview
