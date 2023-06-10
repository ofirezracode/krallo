import React, { useState } from 'react';
import { PopoverCmpHeader } from './popover-cmp-header';
import { BsCheckLg } from "react-icons/bs";
import { colorService } from '../../services/color.service';

export function PopoverCreateBoard({ onAddBoard, onClose }) {
  
  const imgUrls = colorService.getNewBoardColors()
  const unslpashImgs = colorService.getNewBoardImgs()
  const [boardTitle, setBoardTitle] = useState('')
  const [selectedImg, setSelectedImg] = useState('https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686390040/photo-1686019539035-d034ab44a075_vezhjv.jpg');

  const required = boardTitle.length > 0 ? 'not-required' :'required'

  function onSubmit(ev) {
    ev.preventDefault();
    const title = ev.target[0].value;
    onAddBoard(title, selectedImg);
  }

  return (
    <div className='popover-create-board'>
      <PopoverCmpHeader title='Create board' onClose={onClose} />
      <form className='board-title-container' onSubmit={onSubmit}>
        <div>
          <div className='board-example' style={{ backgroundImage: `url(${selectedImg})` }}>
            <img src={'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686393171/14cda5dc635d1f13bc48_l2c80b.svg'} alt='' />
          </div>
          <h3 className='background-choice'>Background</h3>
          <ul className='background-btns-imgs flex clean-list'>
            {unslpashImgs.map((unslpashImg, idx) => (
              <li key={idx}>
                <div
                  className={`imgUrl ${selectedImg === unslpashImg ? 'selected' : ''}`}
                  title='Custom image'
                  style={{ backgroundImage: `url(${unslpashImg})` }}
                  onClick={() => setSelectedImg(unslpashImg)}
                >
                  {selectedImg === unslpashImg && <span className='selected-img'><BsCheckLg /></span>}
                </div>
              </li>
            ))}
          </ul>

          <ul className='background-btns flex clean-list'>
            {imgUrls.map((imgUrl, idx) => (
              <li key={idx}>
                <div
                  className={`imgUrl-gar ${selectedImg === imgUrl ? 'selected' : ''}`}
                  title='Custom image'
                  style={{ backgroundImage: `url(${imgUrl})` }}
                  onClick={() => setSelectedImg(imgUrl)}
                >
                  {selectedImg === imgUrl && <span className='selected-img'><BsCheckLg /></span>}
                </div>
              </li>
            ))}
          </ul>

          <div className='flex column'>
            <label className='form-board-title flex' htmlFor='board-title'>
              <span>Board title</span>
              <span className='asterisk'>*</span>
            </label>
            <input className={`board-title-input ${required}`} type='text' name='board-title' id='board-title' value={boardTitle} onChange={(ev) => setBoardTitle(ev.target.value)} required />
          </div>
          {!boardTitle.length > 0 && <div className='required-title flex'>
            <span role='img' aria-label='Hand waving'>
              👋
            </span>
            <p>Board title is required</p>
          </div>}
          <button className={`create-btn ${required}`}>Create</button>
        </div>
      </form>
    </div>
  )
}

