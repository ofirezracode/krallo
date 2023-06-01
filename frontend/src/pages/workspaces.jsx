import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards } from "../store/board.actions";
import { Link } from "react-router-dom";
import { BsPerson, BsStar, BsStarFill } from "react-icons/bs";

function Workspaces() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])

  console.log(boards)
  return (
    <section className="workspaces">
      <section className="all-boards">
        <section className="starred-boards">
          <div className="title flex center">
            <BsPerson className="title-icon" strokeWidth={'.5px'} />
            <h1>Starred boards</h1>
          </div>
          <div className="boards-container">
            <section className="board-list">
              <ul className="starred-board-list clean-list flex wrap">
                {boards.map(board => {

                  // board.isStarred && <li key={board._id}>
                  let boardStyle = {}
                  if (board.style) {
                    if (board.style.type === 'bgColor') {
                      boardStyle = { backgroundColor: board.style.bgColor }
                    } else if (board.style.type === 'img') {
                      boardStyle = { backgroundImage: `url(${board.style.imgUrl})` }
                      console.log('boardStyle', boardStyle)
                    }
                  }
                  return board.isStarred && <li key={board._id} style={boardStyle}>
                    <article>
                      <Link to={`/board/${board._id}`}>
                        <h4>{board.title}</h4>
                        <BsStarFill className="star-fill" />
                      </Link>
                    </article>
                  </li>
                })
                }
              </ul>
            </section>
            <div className="title flex center">
              <BsPerson className="title-icon" strokeWidth={'.5px'} />
              <h1>Your boards</h1>
            </div>
            <section className="board-list">
              <ul className="starred-board-list clean-list flex wrap">
                {boards.map(board => {

                  // board.isStarred && <li key={board._id}>
                  let boardStyle = {}
                  if (board.style) {
                    if (board.style.type === 'bgColor') {
                      boardStyle = { backgroundColor: board.style.bgColor }
                    } else if (board.style.type === 'img') {
                      boardStyle = { backgroundImage: `url(${board.style.imgUrl})` }
                      console.log('boardStyle', boardStyle)
                    }
                  }
                  return <li key={board._id} style={boardStyle}>
                    <article>
                      <Link to={`/board/${board._id}`}>
                        <h4>{board.title}</h4>
                        {board.isStarred ? <BsStarFill className="star-fill" /> : <BsStar className="star-empty" strokeWidth={'1px'} />}
                      </Link>
                    </article>
                  </li>
                })
                }
              </ul>
            </section>
          </div>
        </section>
        <ul className="starred-board-list">
        </ul>
      </section >
    </section >
  );
}

export default Workspaces;
