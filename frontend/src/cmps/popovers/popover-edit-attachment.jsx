import { useState } from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverEditAttachment({ attachment, onEditAttachment, onClose, handleFocus }) {

    const [title, setTitle] = useState(attachment.title)

    function handleChange(ev) {
        setTitle(ev.target.value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onEditAttachment(attachment._id, title)
        onClose()
    }
    return (
        <section>
            <PopoverCmpHeader title="Edit attachment" onClose={onClose} />

            <section className="popover-edit-attachment">
                <form onSubmit={onSubmit}>
                    <div className='edit-container'>
                        <h5>Link name</h5>
                        <input className='input' type="text" value={title} onChange={(ev) => handleChange(ev)} autoFocus />
                    </div>
                    <button className='btn' type="submit">Update</button>
                </form>
            </section>
        </section>
    )
}
