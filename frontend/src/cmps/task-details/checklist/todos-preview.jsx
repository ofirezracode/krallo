import React, { useState } from 'react'
import { HiXMark } from 'react-icons/hi2'

export function TodosPreview({ todo, onDeleteTodo, checklist, onEditTodo, onClose }) {
    const [isEditing, setIsEditing] = useState(false)
    const handleFocus = (ev) => ev.target.select()
    const [todoTitle, setTodoTitle] = useState(todo.title)


    function handleChange(ev) {
        setTodoTitle(ev.target.value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onEditTodo(checklist._id, todoTitle, todo._id)
        setIsEditing(false)
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSubmit(ev)
        }
    }
    function toggleEditing() {
        setIsEditing(!isEditing)
    }

    return (
        <div>
            <div className='checkbox'></div>
            {isEditing &&
                <form onSubmit={onSubmit}>
                    <textarea
                        rows="2"
                        value={todoTitle}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onKeyPress={handleKeyPress}
                    ></textarea>
                    <div className='textarea-btns flex'>
                        <button className='btn save'>add</button>
                        <button className='x-btn'>Cancel</button>
                    </div>
                </form>}
            {!isEditing &&
                <div className="todo-container">
                    <div className='checkbox'></div>
                    <button onClick={toggleEditing} className='todo flex'>
                        <span className='todo-title'>
                            {todo.title}
                        </span>
                        <span className='x-container'>
                            <button className='x-mark' onClick={() => onDeleteTodo(todo._id, checklist._id)}><HiXMark /></button>
                        </span>
                    </button>
                </div>
            }
        </div>
    )
}
