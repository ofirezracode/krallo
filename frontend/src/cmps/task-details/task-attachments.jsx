import { BsArrowUpRight } from 'react-icons/bs'
import ClipIcon from '../../assets/img/svg/clip-icon.svg'
import CoverIcon from '../../assets/img/svg/cover-icon.svg'
import { Loader } from '../../cmps/loader'
import { utilService } from '../../services/util.service'
import { useState } from 'react'

export function TaskAttachments({ task, onAttachmentAdded, onDeleteAttachment, onEditAttachment, onOpenPopover, onStyleChange }) {
    const handleFocus = (ev) => ev.target.select()

    if (!task) return <Loader />
    const { attachments } = task

    function onAttachToCover(ev, url) {
        ev.preventDefault()
        task.style.imgUrl = url
        onStyleChange({ imgUrl: task.style.imgUrl, type: 'half' })
    }

    if (!attachments) return <div></div>
    return (
        <section className="task-attachments">
            {attachments.length > 0 && <div className="attachment-title flex align-center">
                <img src={ClipIcon} alt="clip-icon" />
                <h3>Attachments</h3>
            </div>}
            {attachments.length > 0 && <ul className="flex column clean-list">
                {attachments.map((attachment) => {
                    // let modeImgColor = utilService.getAvgColor(attachment.url)
                    // let bgColor = { backgroundColor: modeImgColor }
                    <div key={attachment._id}></div>
                    let boardStyle = { backgroundImage: `url(${attachment.url})` }
                    return (
                        <li key={attachment._id} className='flex'>
                            <div className='attach-img flex center' style={boardStyle}>
                                <div className='blur-bg-img'></div>
                                <img src={attachment.url} alt={attachment.title} />
                            </div>
                            <div className='attach-details'>
                                <h4>{attachment.title}
                                    <a href={attachment.url} target="_blank"><BsArrowUpRight /></a>
                                </h4>
                                <div className='attach-actions flex'>
                                    <span>Added {utilService.formatTime(attachment.uploadedAt)}</span>
                                    <span><button>Comment</button></span>
                                    {/* <span><button onClick={() => { onDeleteAttachment(attachment._id) }}>Delete</button></span> */}
                                    <span><button onClick={(e) => onOpenPopover(e, { attachment, onDeleteAttachment }, 'delete-attachment')}>
                                        Delete
                                    </button></span>
                                    <span><button onClick={(e) => onOpenPopover(e, { attachment, onEditAttachment, handleFocus }, 'edit-attachment')}>
                                        Edit
                                    </button></span>

                                </div>
                                <div className='img-to-cover flex align-center'>
                                    <img src={CoverIcon} alt="cover-icon" />
                                    <button onClick={(ev) => onAttachToCover(ev, attachment.url)}>Make Cover</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul >}
            {attachments.length > 0 && <div>
                <button className='btn' onClick={(e) => onOpenPopover(e, { task, onAttachmentAdded }, 'attachment')}>
                    Add an attachment
                </button>
            </div>}
        </section >
    )
}

// import { useEffect, useState } from 'react'
// import { Loader } from '../../cmps/loader'
// import { utilService } from '../../services/util.service'

// export function TaskAttachments({ task }) {
//     const [attachments, setAttachments] = useState([])

//     useEffect(() => {
//         if (!task) return

//         async function calculateAvgColors() {
//             const attachmentsWithColors = await Promise.all(
//                 task.attachments.map(async (attachment) => {
//                     const modeImgColor = await utilService.getAvgColor(attachment.url)
//                     const bgColor = { backgroundColor: modeImgColor }
//                     return { ...attachment, bgColor }
//                 })
//             )
//             setAttachments(attachmentsWithColors)
//         }

//         calculateAvgColors()
//     }, [task])

//     if (!task) return <Loader />

//     return (
//         <section className="task-attachments">
//             {attachments.length > 0 && <div className="attachment-title flex align-center">
//                 <img src={ClipIcon} alt="clip-icon" />
//                 <h3>Attachments</h3>
//             </div>}
//             <ul className="flex column clean-list">
//                 {attachments.map((attachment) => (
//                     <li key={attachment._id} className='flex'>
//                         <div className="attach-img" style={attachment.bgColor}>
//                             <img src={attachment.url} alt={attachment.title} />
//                         </div>
//                         <div className="attach-details">
//                             <h4 style={attachment.bgColor}>{attachment.title}</h4>
//                             <p>{attachment.uploadedAt}</p>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </section>
//     )
// }