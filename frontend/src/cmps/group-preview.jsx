import React from 'react'
import TaskList from './task-list'

function GroupPreview({ group }) {
  return (
    <article className="group-preview">
      <header className="flex between">
        <h3>{group.title}</h3>
        <button>X</button>
      </header>
      <TaskList tasks={group.tasks}></TaskList>
      <section className="add-card-section">
        <div className="add-card">
          <label>+</label>
          <label>Add a card</label>
        </div>
        <p className="add-card-icon">icon</p>
      </section>
    </article>
  )
}

export default GroupPreview
