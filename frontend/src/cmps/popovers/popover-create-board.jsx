import React from 'react';
import { PopoverCmpHeader } from './popover-cmp-header';

export function PopoverCreateBoard({ onClose }) {
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1686019539035-d034ab44a075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjg2MzM1OTY3fA&ixlib=rb-4.0.3&q=80&w=400';

  return (
    <div className='popover-create-board'>
      <PopoverCmpHeader title="Create board" onClose={onClose} />
      <div>
        <div className='board-example'>
          <img src="https://a.trellocdn.com/prgb/assets/14cda5dc635d1f13bc48.svg" alt="" />
        </div>
        <h3 className='background-choice'>Background</h3>
        <ul className='background-btns flex clean-list'>
          <li>
            <button title='Custom image'></button>
          </li>
          <li>
            <button title="Custom image" style={{ backgroundImage: `url("${backgroundImageUrl}")` }}><span></span></button>
          </li>
          <li>
            <button title='Custom image'></button>
          </li>
          <li>
            <button title='Custom image'></button>
          </li>
        </ul>
        <ul className='flex clean-list'>
          <li>
            <button title='Custom image'></button>
          </li>
          <li>
            <button title="Custom image" style={{ backgroundImage: `url("${backgroundImageUrl}")` }}><span></span></button>
          </li>
          <li>
            <button title='Custom image'></button>
          </li>
          <li>
            <button title='Custom image'></button>
          </li>
        </ul>
        <form className='board-title-container'>
          <div className='flex column'>
            <label className='form-board-title flex' htmlFor="board-title"><span>Board title</span><span className='asterisk'>*</span></label>
            <input type="text" name="board-title" id="board-title" required />
          </div>
          <div className='required-title flex'>
            <span role="img" aria-label="Hand waving">👋</span>
            <p>Board title is required</p>
          </div>
          <button className='create-btn' >Create</button>
        </form>
      </div>
    </div>
  );
}


