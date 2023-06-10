import React, { useState } from 'react'
import { PhotosList } from './photos-list'
import { ColorsList } from './colors-list'

export function MenuBackground({ board, setTitle, onUpdateBoardBg }) {
    const [isBgClicked, setIsBgClicked] = useState(false)
    const [bgType, setBgType] = useState('')
    const [selectedImg, setSelectedImg] = useState(board.style.imgUrl)
    function handleBackground(title) {
        setTitle(title)
        setIsBgClicked(prev => !prev)
        setBgType(title)
    }

    function onSetBoardBg(url, ev) {
        ev.stopPropagation()
        onUpdateBoardBg(url)
    }
    return (
        <>
            {!isBgClicked && (<ul className='backgrounds clean-list flex justify-center'>
                <li className='flex justify-center column' onClick={() => handleBackground('Photos')}>
                    <div className='change-bg-img'></div>
                    <p>Photos</p>
                </li>
                <li className='flex justify-center column' onClick={() => handleBackground('Colors')}>
                    <div className='change-bg-color'></div>
                    <p>Colors</p>
                </li>
            </ul>)}
            {bgType === 'Photos' && <PhotosList board={board} setTitle={setTitle} onUpdateBoardBg={onUpdateBoardBg} onSetBoardBg={onSetBoardBg} setSelectedImg={setSelectedImg} selectedImg={selectedImg} />}
            {bgType === 'Colors' && <ColorsList board={board} setTitle={setTitle} onUpdateBoardBg={onUpdateBoardBg} onSetBoardBg={onSetBoardBg} setSelectedImg={setSelectedImg} selectedImg={selectedImg} />}
        </>
    )
}
