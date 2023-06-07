import React from 'react'
import { TodosPreview } from './todos-preview';

export  function TodoList({ todos }) {
    if (!todos) return <div></div>
    return (
        <ul className='todos-list clean-list'>
            {todos && todos.map((todo) => (
                <div key={todo._id}><TodosPreview todo={todo}/></div>
           
            ))}
        </ul>
    )
}
