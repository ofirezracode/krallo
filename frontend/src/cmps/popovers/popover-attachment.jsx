import { useState } from 'react'
import { uploadService } from '../../services/upload.service'
import { PopoverCmpHeader } from './popover-cmp-header'
import { boardService } from '../../services/board.service'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios';

const config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY_TAMAR,
})
const openai = new OpenAIApi(config)

export function PopoverAttachment({ task, onAttachmentAdded, onClose }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [attachments, setAttachments] = useState(task.attachments ? task.attachments : [])
  const [userPrompt, setUserPrompt] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  async function generatorImg(ev) {
    ev.preventDefault();
    const imgParameters = {
      prompt: userPrompt,
      n: 1,
      size: '256x256'
    };
    const title = userPrompt
    try {
      const response = await openai.createImage(imgParameters, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(response.data)
      const urlData = response.data.data[0].url;
      setImgUrl(urlData);
      onSubmitUrlAI(urlData, title)
    } catch (err) {
      console.error('err', err);
    }
  }

  async function onAddAttachment(ev) {
    try {
      ev.preventDefault()
      const imgUrl = await uploadService.uploadImg(ev)
      const newAttach = boardService.getEmptyAttachment()
      newAttach.url = imgUrl.url
      newAttach.title = imgUrl.original_filename
      setAttachments([...attachments, newAttach])
      onAttachmentAdded([...attachments, newAttach])
      onClose()
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
    onClose()
  }

  function onSubmitUrlAI(imgUrlAI, title) {
    const newAttach = boardService.getEmptyAttachment()
    newAttach.url = imgUrlAI
    newAttach.title = title
    if (title) newAttach.title = title
    setAttachments([...attachments, newAttach])
    onAttachmentAdded([...attachments, newAttach])
    onClose()
  }
  return (
    <section>
      <PopoverCmpHeader title="Attach from..." onClose={onClose} />

      <section className="popover-attachment">
        <label className="file-input flex column" htmlFor="img-input">
          Computer
          <input type="file" id="img-input" name="image" onChange={onAddAttachment} />
        </label>
        <div className="url-input">
          <hr />
          <form onSubmit={onSubmitUrl}>
            <h5>Attach a link</h5>
            <input type="text" placeholder="Paste any link here..." value={url} onChange={(ev) => setUrl(ev.target.value)} />
            {url.length > 0 && (
              <div>
                <h5>Link name (optional)</h5>
                <input type="text" onChange={(ev) => setTitle(ev.target.value)} />
              </div>
            )}
            <button className="btn" type="submit">
              Attach
            </button>
          </form>
        </div>
        <div className="url-input">
          <hr />
          <form onSubmit={generatorImg}>
            <h5>Use AI photo generator</h5>
            <input type="text" placeholder="Write your prompt here..." value={userPrompt} onChange={(ev) => setUserPrompt(ev.target.value)} />
            <button className="btn" type="submit">
              Generate
            </button>
          </form>
          {/* {imgUrl && <img src={imgUrl} alt="AI img" />} */}
        </div>
      </section>
    </section>
  )
}
