import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards, updateBoard } from "../store/board.actions";
import { BsPerson } from "react-icons/bs";
import BoardPreview from "../cmps/board-preview";
import { Link } from "react-router-dom";
import BoardList from "../cmps/board-list";

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


  return (
    <section className="workspaces">
      <section className="all-boards">
        <section className="starred-boards">
          <div className="title flex center">
            <BsPerson className="title-icon" strokeWidth={'.5px'} />
            <h1>Starred boards</h1>
          </div>
          <div className="boards-container">
            <BoardList boards={boards} toggleIsStarred={toggleIsStarred} />
          </div>
        </section>
      </section >
    </section >
  );
}

export default Workspaces;
