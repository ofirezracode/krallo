// import { useState } from "react";
// import { uploadService } from "../../services/upload.service";

// export function PopoverAttachment({ onAttachmentAdded }) {
//     function onImg(img) {
//         if (!img) return
//         onAttachmentAdded(img)
//     }

//     function onAddAttachment(e) {
//         uploadService.uploadImg(e, onImg)
//     }

//     return (
//         <section className="popover-attachment">
//             {/* {img && <img src={img} />} */}
//             <label className="file-input flex column" htmlFor="img-input">
//                 Computer
//                 <input type="file" id="img-input" name="image" onChange={onAddAttachment} />
//             </label>
//             {/* <h5>Attach a link</h5>
//             <form onSubmit={onAddAttachment}>
//                 <input type="text" placeholder="Place any link here..." />
//                 <button>Attach</button>
//             </form> */}
//         </section>
//     )
// }

import { useState } from 'react'
import { uploadService } from '../../services/upload.service'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverAttachment({ onAttachmentAdded, onClose }) {
  const [url, setUrl] = useState('')

  function onImg(img) {
    if (!img) return
    onAttachmentAdded(img)
  }

  function onAddAttachment(e) {
    // e.preventDefault()
    uploadService.uploadImg(e, onImg)
  }

  function onAddAttachmentUrl(e) {
    e.preventDefault()
    uploadService.uploadImgFromUrl(e, onImg)
  }

  return (
    <section>
      <PopoverCmpHeader title="Attach from..." onClose={onClose} />

      <section className="popover-attachment">
        {/* {img && <img src={img} />} */}
        <label className="file-input flex column" htmlFor="img-input">
          Computer
          <input type="file" id="img-input" name="image" onChange={onAddAttachment} />
        </label>
        <h5>Attach a link</h5>
        <form onSubmit={onAddAttachmentUrl}>
          <input type="text" placeholder="Place any link here..." value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit">Attach</button>
        </form>
      </section>
    </section>
  )
}
