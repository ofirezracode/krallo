import React, { useEffect, useState } from 'react'
import { Loader } from '../loader'
import { utilService } from '../../services/util.service'
import { BsCheckLg } from 'react-icons/bs'

export function PhotosList({ onUpdateBoardBg, resultsAmount, returnSize, setSelectedImg, selectedImg }) {
  const [imgs, setImgs] = useState([])
  const [searchedTxt, setSearchedTxt] = useState('')
  const [debouncedSearchTxt, setDebouncedSearchTxt] = useState('')

  const API_KEY_TAMAR = 'hAwJMEKfBFwvCKiI1MZl5TeXMPkv4tCdr_YPOW3im0g'
  const API_KEY_ETAI = process.env.REACT_APP_UNSPLASH_API_KEY
  useEffect(() => {
    async function fetchImgs() {
      const response = await fetch(`https://api.unsplash.com/photos/random?count=30${debouncedSearchTxt ? `&query=${debouncedSearchTxt}` : ''}&client_id=${API_KEY_ETAI}`)
      // const response = await fetch(`https://api.unsplash.com/photos?&page=${utilService.getRandomIntInclusive(1, 1000)}&per_page=${amount}&query=pattern&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      const data = await response.json()
      setImgs(data)
    }
    fetchImgs()
  }, [debouncedSearchTxt])

  const debouncedSearch = utilService.debounce((value) => setDebouncedSearchTxt(value))

  function onSearchPhotos(ev) {
    ev.preventDefault()
    setImgs([])
    debouncedSearch(searchedTxt)
  }

  function handleChange(img, ev) {
    let urls = img.urls
    if (selectedImg) setSelectedImg(urls.small)
    ev.stopPropagation()
    onUpdateBoardBg(urls)
  }

  return (
    <>
      <form className="search-photos-bar" onSubmit={onSearchPhotos}>
        <div>
          <input
            placeholder="Photos"
            type="search"
            className="input"
            value={searchedTxt}
            onChange={(ev) => setSearchedTxt(ev.target.value)}
          />
        </div>
      </form>
      {!imgs ? (
        <div>
          <Loader />
        </div>
      ) : (
        <ul className="photos-list clean-list">
          {imgs.map((img, idx) => (
            <li
              key={idx}
              className={`flex justify-center column ${selectedImg === img.urls.small ? 'selected' : ''}`}
              onClick={(ev) => handleChange(img, ev)}
            >
              <div className="bg-img" style={{ background: `url(${img.urls.small}) center center / cover` }}>
                <a href={img.user.portfolio_url} target="_blank">
                  {img.user.username}
                </a>
                {selectedImg === img.urls.small && (
                  <span className="selected-img flex center">
                    <BsCheckLg />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
