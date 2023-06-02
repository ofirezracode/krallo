import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards, updateBoard } from "../store/board.actions";
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
      <section className="starred-boards">
        <BoardList boards={boards} toggleIsStarred={toggleIsStarred} />
      </section>
    </section >
  )
}

export default Workspaces;
