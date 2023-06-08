import React from 'react'
import ClipIcon from '../../assets/img/svg/clip-icon.svg'
import DescIcon from '../../assets/img/svg/desc-icon.svg'
import { BsTextParagraph, BsCheck2Square, BsChat, BsPaperclip } from 'react-icons/bs'

export function Indicator({ type, txt }) {
  return (
    <li className="indicator">
      <span className="flex">
        {type === 'description' && <img src={DescIcon} className="indicator-icon clip-icon" />}
        {type === 'comments' && <BsChat className="indicator-icon comments" />}
        {type === 'attachments' && <img src={ClipIcon} className="indicator-icon clip-icon" />}
        {type === 'checklists' && <BsCheck2Square className="indicator-icon" />}

        {txt && <label>{txt}</label>}
      </span>
    </li>
  )
}
