import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards } from "../store/board.actions";
import { Link } from "react-router-dom";

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-1 h-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
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
                    }
                  }
                  return board.isStarred && <li key={board._id} style={boardStyle}>
                    <article>
                      <Link to={`/board/${board._id}`}>
                        <h4>{board.title}</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f2d600" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
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
