import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards, updateBoard } from "../store/board.actions";
import { BsPerson } from "react-icons/bs";
import BoardPreview from "../cmps/board-preview";
import { Link } from "react-router-dom";

function Workspaces() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])

  function toggleIsStarred(ev, board) {
    ev.preventDefault()
    board.isStarred = !board.isStarred
    updateBoard(board)
  }

  const starredBoards = boards.filter(board => board.isStarred)
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
                <BoardPreview boards={starredBoards} toggleIsStarred={toggleIsStarred} />
              </ul>
            </section>
            <div className="title flex center">
              <BsPerson className="title-icon" strokeWidth={'.5px'} />
              <h1>Your boards</h1>
            </div>
            <section className="board-list">
              <ul className="starred-board-list clean-list flex wrap">

                <BoardPreview boards={boards} toggleIsStarred={toggleIsStarred} />
                <li className="new-board">
                  <article className="flex align-center justify-center">
                    {/* <Link to={`/board/${board._id}`}> */}
                    <p>Create new board</p>
                    {/* </Link> */}
                  </article>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </section >
    </section >
  );
}

export default Workspaces;
