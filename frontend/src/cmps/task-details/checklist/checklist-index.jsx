import React from 'react'
import { ChecklistList } from './checklist-list';


export function ChecklistIndex({ task, onDeleteChecklist, onOpenPopover }) {
    if (!task) return <div></div>
    return (
        <div className='task-checklist-container'>
            <ChecklistList checklists = {task.checklists} onDeleteChecklist={onDeleteChecklist} onOpenPopover={onOpenPopover} />
        </div>
    )
}
