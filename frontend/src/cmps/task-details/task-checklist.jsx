import React from 'react'
import { BsCheck2Square } from "react-icons/bs";
import { ChecklistTodosPreview } from './checklist-todos-preview';


export function TaskChecklist({ checklists }) {
    if (!checklists) return <div></div>
    return (
        <div className='task-checklist-container' >
            {checklists && checklists.map((checklist) => (
                <div className="checklist" key={checklist._id}>
                    <div className="checklist-title-container">
                        <span><BsCheck2Square /></span>
                        <div className="checklist-title flex">
                            <h3>{checklist.title}</h3>
                            <div className='checklist-title-btns'>
                                <button className='btns hide-checked-btn'>Hide checked items</button>
                                <button className='btns delete'>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className='checklist-progress'>
                        <span>50%</span>
                        <div className='checklist-progress-bar'>
                            <div className='progress-bar'>
                                <div className='progress-bar-current'></div>
                            </div>
                        </div>
                    </div>
                    <ChecklistTodosPreview todos={checklist.todos} />
                    <button className='checklist-add-btn'>Add an item</button>
                </div>
            ))}
        </div>
    )
}
