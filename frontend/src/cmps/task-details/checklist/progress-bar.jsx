import React, { useEffect, useState } from 'react'

export function ProgressBar({ checklist }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    calculateProgress()
  }, [checklist])

  function calculateProgress() {
    if (!checklist || !checklist.todos || checklist.todos.length === 0) {
      setProgress(0)
      return
    }

    const completedTodos = checklist.todos.filter((todo) => todo.isDone)
    const progress = (completedTodos.length / checklist.todos.length) * 100
    setProgress(Math.round(progress))
  }

  const progressClass = progress === 100 ? 'progress-bar-complete' : ''

  return (
    <div className="checklist-progress">
      <span>{`${progress}%`}</span>
      <div className={`checklist-progress-bar ${progressClass}`}>
        <div className="progress-bar">
          <div className="progress-bar-current" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}
