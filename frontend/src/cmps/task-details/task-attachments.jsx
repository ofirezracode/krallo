export function TaskAttachments({ attachments, title }) {
    return (
        <div className="task-attachments">
            {attachments?.length && attachments.map(attachment =>
                <div>11111</div>
                // <img src={attachment} alt={title} />
            )}
        </div>
    )
}