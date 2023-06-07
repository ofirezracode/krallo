import React from 'react'
import { ChecklistList } from './checklist-list';


export function ChecklistIndex({ task, onAddChecklist }) {
    if (!task) return <div></div>
    return (
        <div className='task-checklist-container'>
            <ChecklistList checklists = {task.checklists} />
        </div>
    )
}
