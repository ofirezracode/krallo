import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverDeleteAttachment({ attachment, onDeleteAttachment, onClose }) {

    function onClickDelete() {
        onDeleteAttachment(attachment._id)
        onClose()
    }

    return (
        <section>
            <PopoverCmpHeader title="Delete attachment?" onClose={onClose} />

            <section className="popover-delete-attachment">
                <p>Deleting an attachment is permanent. There is no undo.</p>
                <button className='btn delete-btn' onClick={() => { onClickDelete() }}>Delete</button>
            </section>
        </section>
    )
}
