import React from 'react'
import { HiXMark } from 'react-icons/hi2'

export function ChecklistTodosPreview({ todos }) {
    if (!todos) return <div></div>
    return (
        <ul className='todos-list clean-list'>
            {todos && todos.map((todo) => (
                <li className="todo-container" key={todo._id}>
                    <div className='checkbox'></div>
                    <div className=''>
                        <div className='todo flex flex'>
                            <span className='todo-title'>
                                {todo.title}
                            </span>
                            <span className='x-container'>
                                <button className='x-mark'><HiXMark /></button>
                            </span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
