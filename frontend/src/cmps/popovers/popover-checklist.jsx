import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AddCloseButtons } from '../add-close-buttons'

export function PopoverChecklist({ task }) {

    console.log('task from checklist', task)
    return (
        <form onSubmit="" className="popover-checklist flex column">
            <label>Title</label>
            <input autoFocus type="text" id="checklist-title" name="checklist-title" placeholder="Checklist" />
            <button className="add-button">Add</button>
        </form>
    )
}