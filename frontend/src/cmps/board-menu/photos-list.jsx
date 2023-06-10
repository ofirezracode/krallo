import React, { useEffect, useState } from 'react'
import { Loader } from '../loader'
import { utilService } from '../../services/util.service'
import { useSelector } from 'react-redux'
import { BsCheckLg } from "react-icons/bs";

export function PhotosList({ board, setTitle, onUpdateBoardBg, onSetBoardBg, setSelectedImg, selectedImg }) {
    const [imgs, setImgs] = useState([])

    useEffect(() => {
        const fetchImgs = async () => {
            const response = await fetch(`https://api.unsplash.com/photos?&page=${utilService.getRandomIntInclusive(1, 1000)}&per_page=30&query=pattern&client_id=hjp37zjNt0WQ1s8R1MB8eXIvk5PNQigrRyOXgijwwT8`)
            // const response = await fetch(`https://api.unsplash.com/photos?&page=${utilService.getRandomIntInclusive(1, 1000)}&per_page=30&query=pattern&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
            const data = await response.json()
            setImgs(data)
        }
        fetchImgs()
    }, [])

    function handleChange(url, ev) {
        onSetBoardBg(url, ev)
        setSelectedImg(url)
    }

    return (
        <>
            {!imgs ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <ul className="photos-list clean-list">
                    {imgs.map((img, idx) => (
                        <li
                            key={idx}
                            className={`flex justify-center column ${selectedImg === img.urls.full ? 'selected' : ''}`}
                            onClick={(ev) => handleChange(img.urls.full, ev)}
                        >
                            <div className="bg-img" style={{ background: `url(${img.urls.small}) center center / cover` }}>
                                <a href={img.user.portfolio_url} target="_blank">
                                    {img.user.username}
                                </a>
                                {selectedImg === img.urls.full && <span className="selected-img"><BsCheckLg /></span>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
