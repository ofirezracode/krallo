import { useState } from "react";
import { uploadService } from "../../services/upload.service";

export function PopoverAttachment({ onAttachmentAdded }) {
    // const [img, setImg] = useState('')
    function onAddAttachment(e) {
        // addAttachment()
        uploadService.loadImageFromInput(e, onImg)
    }

    function onImg(img) {
        if (!img) return
        // setImg(img)
        onAttachmentAdded(img)
    }

    return (
        <section className="popover-attachment">
            {/* {img && <img src={img} />} */}
            <label className="file-input flex column" htmlFor="img-input">
                Computer
                <input type="file" id="img-input" name="image" onChange={onAddAttachment} />
            </label>
        </section>
    )
}