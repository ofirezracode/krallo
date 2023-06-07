import React from 'react'
import { ChecklistList } from './checklist-list';


export function ChecklistIndex({ checklists }) {
    if (!checklists) return <div></div>
    return (
        <div className='task-checklist-container'>
            <ChecklistList checklists = {checklists}/>
        </div>
    )
}
