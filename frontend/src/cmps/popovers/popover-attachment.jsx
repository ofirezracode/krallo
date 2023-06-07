import { useState } from 'react'
import { uploadService } from '../../services/upload.service'
import { PopoverCmpHeader } from './popover-cmp-header'
import { boardService } from '../../services/board.service.local'

export function PopoverAttachment({ task, onAttachmentAdded, onClose }) {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [attachments, setAttachments] = useState(task.attachments ? task.attachments : [])

    async function onAddAttachment(ev) {
        try {
            ev.preventDefault()
            const imgUrl = await uploadService.uploadImg(ev)
            const newAttach = boardService.getEmptyAttachment()
            newAttach.url = imgUrl.url
            newAttach.title = imgUrl.original_filename
            console.log(newAttach)
            setAttachments([...attachments, newAttach])
            onAttachmentAdded([...attachments, newAttach])
        } catch (err) {
            console.log('err', err)
        }
    }

    function onSubmitUrl(ev) {
        ev.preventDefault()
        ev.target.value = ''
        if (!url || !url.trim()) return
        const newAttach = boardService.getEmptyAttachment()
        newAttach.url = url
        if (title) newAttach.title = title
        setAttachments([...attachments, newAttach])
        onAttachmentAdded([...attachments, newAttach])
    }

    return (
        <section>
            <PopoverCmpHeader title="Attach from..." onClose={onClose} />

            <section className="popover-attachment">
                <label className="file-input flex column" htmlFor="img-input">
                    Computer
                    <input type="file" id="img-input" name="image" onChange={onAddAttachment} />
                </label>
                <div className='url-input'>
                    <hr />
                    <form onSubmit={onSubmitUrl}>
                        <h5>Attach a link</h5>
                        <input type="text" placeholder="Paste any link here..." value={url} onChange={(ev) => setUrl(ev.target.value)} />
                        {url.length > 0 && <div><h5>Link name (optional)</h5>
                            <input type="text" onChange={(ev) => setTitle(ev.target.value)} /></div>}
                        <button className='btn' type="submit">Attach</button>
                    </form>
                </div>
            </section>
        </section>
    )
}
