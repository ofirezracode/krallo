import React from 'react'
import { BsCheck2Square } from "react-icons/bs";
import { TodoList } from './todo-list';
import { useState } from 'react'
import { ProgressBar } from './progress-bar';
import { HiXMark } from 'react-icons/hi2'


export function ChecklistPreview({ checklist, onDeleteChecklist, onOpenPopover, onClose, onEditChecklist }) {
    const [checklistTitle, setChecklistTitle] = useState(checklist.title)
    const handleFocus = (ev) => ev.target.select()
    const [isEditing, setIsEditing] = useState(false);
    // const [inputWidth, setInputWidth] = useState('100%')

    function handleChange(ev) {
        setChecklistTitle(ev.target.value)
        // setInputWidth(`${ev.target.value.length * 10}px`)
        onEditChecklist(checklist._id, checklistTitle);
    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log(checklistTitle);
        onEditChecklist(checklist._id, checklistTitle)
        setIsEditing(false)
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            onSubmit(ev)
        }
    }

    function toggleEditing() {
        setIsEditing(!isEditing);
    }

    return (
        <div>
            <div className="checklist" key={checklist._id}>
                <div className="checklist-title-container">
                    <span><BsCheck2Square /></span>
                    <div className="checklist-title flex">
                        {isEditing ? (
                            <form onSubmit={onSubmit}>
                                <textarea
                                    rows="2"
                                    value={checklistTitle}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onKeyPress={handleKeyPress}
                                ></textarea>
                                <div className='textarea-btns flex'>
                                    <button className='btn save'>Save</button>
                                    <button className='x-btn'><HiXMark /></button>
                                </div>

                            </form>
                        ) : (
                            <button onClick={toggleEditing}>
                                <h3>{checklist.title}</h3>
                            </button>
                        )}
                        {/* <form onSubmit={onSubmit} style={{ width: inputWidth }}
                        </form> */}
                           {!isEditing && <div className='checklist-title-btns flex'>
                            {/* <button className='btns hide-checked-btn'>Hide checked items</button> */}
                            <button className='btns delete' onClick={(ev) => onOpenPopover(ev, { checklist, onDeleteChecklist, onClose }, 'delete-checklist')}>Delete</button>

                        </div>}
                    </div>
                </div>
                <ProgressBar checklist={checklist} />
                <TodoList todos={checklist.todos} />
                <button className='checklist-add-btn'>Add an item</button>
            </div>
        </div>
    )
}
