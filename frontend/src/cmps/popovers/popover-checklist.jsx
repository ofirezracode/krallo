import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverChecklist({ task, onClose, onAddChecklist }) {
  const inputRef = useRef()
  const [checklistTitle, setChecklistTitle] = useState('Checklist')

  useEffect(() => {
    inputRef.current.select()
  }, [])

  function handleChange(ev) {
    setChecklistTitle(ev.target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onAddChecklist(checklistTitle)
    onClose()
  }

  return (
    <section>
      <PopoverCmpHeader title="Add checklist" onClose={onClose} />
      <form onSubmit={onSubmit} className="popover-checklist flex column">
        <label>Title</label>
        <input type="text" onChange={handleChange} id="checklist-title" ref={inputRef} name="checklist-title" value={checklistTitle} />
        <button className="add-button">Add</button>
      </form>
    </section>
  )
}
