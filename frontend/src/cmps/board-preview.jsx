import React from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function BoardPreview({ board, toggleIsStarred }) {
    return (
        <article>
            <Link to={`/board/${board._id}`}>
                <h4>{board.title}</h4>
                {board.isStarred ? (
                    <BsStarFill className="star-fill" onClick={(ev) => toggleIsStarred(ev, board)} />
                ) : (
                    <BsStar className="star-empty" strokeWidth={'1px'} onClick={(ev) => toggleIsStarred(ev, board)} />
                )}
            </Link>
        </article>
    )
}
