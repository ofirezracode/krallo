import React from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export function BoardPreview({ board, toggleIsStarred }) {
    return (
        <article>
            <Link to={`/board/${board._id}`}>
                <h4>{board.title}</h4>
                {board.isStarred ? (
                    <BsStarFill className="star-fill" strokeWidth={'1px'} onClick={(ev) => toggleIsStarred(ev, board)} />
                ) : (
                    <BsStar className="star-empty" strokeWidth={'1px'} onClick={(ev) => toggleIsStarred(ev, board)} />
                )}
            </Link>
            <div className='screen'></div>
        </article>
    )
}