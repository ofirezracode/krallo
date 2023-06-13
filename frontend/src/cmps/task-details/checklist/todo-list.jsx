import React, { useState } from 'react'
import { TodoPreview } from './todo-preview'

export function TodoList({ todos, checklist, onDeleteTodo, onAddTodo, onEditTodo, calculateProgress }) {
  const [isAdding, setIsAdding] = useState(false)
  const handleFocus = (ev) => ev.target.select()
  const [todoTitle, setTodoTitle] = useState('')

  function handleChange(ev) {
    setTodoTitle(ev.target.value)
  }

  function onSubmitAdding(ev) {
    ev.preventDefault()
    onAddTodo(checklist._id, todoTitle)
    setTodoTitle('')
    setIsAdding(false)
  }

  function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      onSubmitAdding(ev)
    }
  }

  function toggleAdding() {
    setIsAdding(!isAdding)
  }

  if (!todos) return <div></div>
  return (
    <div className="todos-list ">
      <ul className="clean-list">
        {todos &&
          todos.map((todo) => (
            <li key={todo._id}>
              <TodoPreview todo={todo} checklist={checklist} onDeleteTodo={onDeleteTodo} onEditTodo={onEditTodo} />
            </li>
          ))}
      </ul>
      {isAdding && (
        <form onSubmit={onSubmitAdding}>
          <textarea
            rows="2"
            value={todoTitle}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            placeholder="Add an item"
          ></textarea>
          <div className="textarea-btns flex">
            <button className="btn save">Add</button>
            <button className="close-area-btn" type="button" onClick={toggleAdding}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {!isAdding && (
        <button className="checklist-add-btn" onClick={toggleAdding}>
          Add an item
        </button>
      )}
    </div>
  )
}
