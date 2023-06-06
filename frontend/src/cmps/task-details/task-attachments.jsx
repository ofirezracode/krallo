import ClipIcon from "../../assets/img/svg/clip-icon.svg"

export function TaskAttachments({ task }) {
    console.log(task)
    const { title, attachments } = task
    console.log(attachments)
    if (!attachments?.length) return <div></div>
    return (
        <section className="task-attachments">
            <div className="attachment-title flex align-center">
                <img src={ClipIcon} alt="clip-icon" />
                <h3>Attachments</h3>
            </div>
            <ul className="flex column clean-list">
                {attachments?.length && attachments.map((attachment, idx) =>
                    <li key={idx}>
                        {/* <UserImg /> */}
                        <img src={attachment} alt={title} />
                    </li>
                )}
            </ul>
        </section>
    )
}
