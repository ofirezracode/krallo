import React from 'react'
import { BsCheck2Square } from "react-icons/bs";
import { TodoList } from './todo-list';
import { useState } from 'react'
import { ProgressBar } from './progress-bar';

export function ChecklistPreview({ checklist, onDeleteChecklist, onOpenPopover, onClose, onEditChecklist }) {
    const [checklistTitle, setChecklistTitle] = useState(checklist.title)
    const handleFocus = (ev) => ev.target.select()

    function handleChange(ev) {
        setChecklistTitle(ev.target.value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onEditChecklist(checklist._id,checklistTitle)
    }


    return (
        <div>
            <div className="checklist" key={checklist._id}>
                <div className="checklist-title-container">
                    <span><BsCheck2Square /></span>
                    <div className="checklist-title flex">
                        {/* <h3>{checklist.title}</h3> */}
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                value={checklistTitle}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                        </form>
                        <div className='checklist-title-btns'>
                            <button className='btns hide-checked-btn'>Hide checked items</button>
                            <button className='btns delete' onClick={(ev) => onOpenPopover(ev, { checklist, onDeleteChecklist, onClose }, 'delete-checklist')}>Delete</button>
                            {/* <button className='btns delete' onClick={()=> onDeleteChecklist(checklist._id)}>Delete</button> */}
                        </div>
                    </div>
                </div>
                <ProgressBar checklist={checklist} />
                <TodoList todos={checklist.todos} />
                <button className='checklist-add-btn'>Add an item</button>
            </div>
        </div>
    )
}
