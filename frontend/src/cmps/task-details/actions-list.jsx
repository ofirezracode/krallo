import { BsCheck2Square, BsClock, BsPaperclip, BsPerson, BsTag } from 'react-icons/bs'

export function ActionsList({ task, onOpenPopover, board, onHandleTaskMembers }) {
    return (
        <section className="add-to-card-container">
            <h5>Add to card</h5>
            <section className="add-to-card-btns">
                <button
                    onClick={(e) =>
                        onOpenPopover(e, { members: board.members, taskMembers: task.members, onHandleTaskMembers }, 'members', 'Members')
                    }
                    title="Members"
                >
                    <BsPerson />
                    <p>Members</p>
                </button>
                <button title="Labels">
                    <BsTag className="label-icon" />
                    <p>Labels</p>
                </button>
                <button title="Checklist">
                    <BsCheck2Square />
                    <p>Checklist</p>
                </button>
                <button title="Dates">
                    <BsClock />
                    <p>Dates</p>
                </button>
                <button onClick={(e) => onOpenPopover(e, { attachment: task.attachment }, 'attachment', 'Attach from...')} title="Attachment">
                    <BsPaperclip className="clip-icon" />
                    <p>Attachment</p>
                </button>
            </section>
        </section>
    )
}
