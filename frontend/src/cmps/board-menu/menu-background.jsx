import React, { useEffect, useState } from 'react'
import { PhotosList } from './photos-list'
import { ColorsList } from './colors-list'

export function MenuBackground({ board, setTitle, onUpdateBoardBg }) {
  const [isBgClicked, setIsBgClicked] = useState(false)
  const [bgType, setBgType] = useState('')
  const [selectedImg, setSelectedImg] = useState(board.style.imgUrl)

  useEffect(() => {
    if (board.style.type === 'bgColor') {
      setSelectedImg({ backgroundColor: board.style.bgColor })
    } else if (board.style.type === 'img') {
      console.log('menu-background board.style', board.style)
      let url = ''
      if (board.style.imgUrlSmall) {
        url = board.style.imgUrlSmall
      } else {
        url = board.style.imgUrl
      }
      setSelectedImg(url)
    }
  }, [board])
  function handleBackground(title) {
    setTitle(title)
    setIsBgClicked((prev) => !prev)
    setBgType(title)
  }

  function onSetBoardBg(urls, ev) {
    ev.stopPropagation()
    onUpdateBoardBg(urls)
  }
  return (
    <>
      {!isBgClicked && (
        <ul className="backgrounds clean-list flex justify-center">
          <li className="flex justify-center column" onClick={() => handleBackground('Photos by Unsplash')}>
            <div className="change-bg-img"></div>
            <p>Photos</p>
          </li>
          <li className="flex justify-center column" onClick={() => handleBackground('Colors')}>
            <div className="change-bg-color"></div>
            <p>Colors</p>
          </li>
        </ul>
      )}
      {bgType === 'Photos by Unsplash' && (
        <PhotosList
          board={board}
          setTitle={setTitle}
          onUpdateBoardBg={onUpdateBoardBg}
          onSetBoardBg={onSetBoardBg}
          setSelectedImg={setSelectedImg}
          selectedImg={selectedImg}
        />
      )}
      {bgType === 'Colors' && (
        <ColorsList
          board={board}
          setTitle={setTitle}
          onUpdateBoardBg={onUpdateBoardBg}
          onSetBoardBg={onSetBoardBg}
          setSelectedImg={setSelectedImg}
          selectedImg={selectedImg}
        />
      )}
    </>
  )
}
