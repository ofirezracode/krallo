import { useState } from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverEditAttachment({ attachment, onEditAttachment, onClose }) {

    const [title, setTitle] = useState(attachment.title)
    const handleFocus = (ev) => ev.target.select()

    function handleChange(ev) {
        setTitle(ev.target.value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onEditAttachment(attachment._id, title)
        onClose()
    }
    console.log(attachment.title)
    console.log(title)
    return (
        <section>
            <PopoverCmpHeader title="Edit attachment" onClose={onClose} />

            <section className="popover-edit-attachment">
                <form onSubmit={onSubmit}>
                    <h5>Link name</h5>
                    <input type="text" value={title} onChange={(ev) => handleChange(ev)} onFocus={handleFocus} />
                    <button className='btn' type="submit">Update</button>
                </form>
            </section>
        </section>
    )
}
