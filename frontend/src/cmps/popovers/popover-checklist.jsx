import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverChecklist({ task, onClose }) {
    const inputRef = useRef(null)

    useEffect(() => {
      inputRef.current.select()
    }, [])


    console.log('task from checklist', task)
    return (
        <section>
        <PopoverCmpHeader title="Add checklist" onClose={onClose} />
        <form onSubmit="" className="popover-checklist flex column">
            <label>Title</label>
            <input autoFocus type="text" id="checklist-title" ref={inputRef} name="checklist-title" value="Checklist" />
            <button className="add-button">Add</button>
        </form>
        </section>
    )
}