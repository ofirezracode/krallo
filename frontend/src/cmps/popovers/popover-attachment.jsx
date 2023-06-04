import { useState } from "react";
import { uploadService } from "../../services/upload.service";

export function PopoverAttachment({ task, board }) {
    const [img, setImg] = useState('')
    function onAddAttachment(e) {
        // addAttachment()
        uploadService.loadImageFromInput(e, onImg)
    }

    function onImg(img) {
        if (!img) return
        setImg(img)
        addAttachmentToTask(img)
    }

    function addAttachmentToTask() {
        console.log(task.attachments)
        task.attachments.push(img)
        console.log(task.attachments);
    }
    console.log(board);
    return (
        <section className="popover-attachment">
            {img && <img src={img} />}
            <label className="file-input flex column" htmlFor="img-input">
                Computer
                <input type="file" id="img-input" name="image" onChange={onAddAttachment} />
            </label>
        </section>
    )
}