import React from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function BoardPreview({ boards, toggleIsStarred, boardStyle }) {
    return (
        <section className="board-list">
            <ul className="starred-board-list clean-list flex wrap">
                {boards.map(board => {
                    let boardStyle = {}
                    if (board.style) {
                        if (board.style.type === 'bgColor') {
                            boardStyle = { backgroundColor: board.style.bgColor }
                        } else if (board.style.type === 'img') {
                            boardStyle = { backgroundImage: `url(${board.style.imgUrl})` }
                        }
                    }
                    return <li key={board._id} style={boardStyle}>
                        <article>
                            <Link to={`/board/${board._id}`}>
                                <h4>{board.title}</h4>
                                {board.isStarred ? <BsStarFill className="star-fill" onClick={(ev) => toggleIsStarred(ev, board)} /> :
                                    <BsStar className="star-empty" strokeWidth={'1px'} onClick={(ev) => toggleIsStarred(ev, board)} />}
                            </Link>
                        </article>
                    </li>
                })
                }
            </ul>
        </section>
    )
}
