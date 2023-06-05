import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export function TaskPreview({ boardId, task }) {
  const navigate = useNavigate()
  const board = useSelector((storeState) => storeState.boardModule.currBoard)

  const [boardLabels, setBoardLabels] = useState(board.labels)

  useEffect(() => setBoardLabels(board.labels), [board])

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
      {previewStyle.backgroundColor && <div className="preview-cover" style={previewStyle}></div>}
      <section className="preview-container">
        {task.labelIds && boardLabels.length > 0 && (
          <ul className="labels flex clean-list">
            {task.labelIds.map((labelId, i) => {
              const label = boardLabels.find((boardLabel) => boardLabel._id === labelId)
              let labelStyle = {}
              labelStyle = { backgroundColor: label.color }
              return (
                <li className="flex center" key={i}>
                  <button className="" style={labelStyle}></button>
                </li>
              )
            })}
          </ul>
        )}

        <h4>{task.title}</h4>
      </section>
    </article>
  )
}
