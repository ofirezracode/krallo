import React from 'react'

import { BsTextParagraph, BsCheck2Square, BsChat, BsPaperclip } from 'react-icons/bs'

export function Indicator({ type, txt }) {
  return (
    <li className="indicator">
      <span className="flex">
        {type === 'description' && <BsTextParagraph className="indicator-icon description" />}
        {type === 'comments' && <BsChat className="indicator-icon comments" />}
        {type === 'attachments' && <BsPaperclip className="indicator-icon" />}
        {type === 'checklists' && <BsCheck2Square className="indicator-icon" />}

        {txt && <label>{txt}</label>}
      </span>
    </li>
  )
}
