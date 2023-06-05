import { BsPaperclip } from "react-icons/bs"
import { UserImg } from "../user-img"

export function TaskAttachments({ attachments, title }) {
    // if (!attachments) return
    return (
        <section className="task-attachments">
            <div className="attachment-title flex">
                <BsPaperclip />
                <h3>Attachments</h3>
            </div>
            <ul className="flex column">
                {attachments?.length && attachments.map(attachment =>
                    <li>
                        <UserImg />
                        {/* <img src={attachment} alt={title} /> */}
                    </li>
                )}
            </ul>
        </section>
    )
}