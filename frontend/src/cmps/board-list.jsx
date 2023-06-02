import { BsPerson } from "react-icons/bs";
import BoardPreview from "./board-preview";

export default function BoardList({ boards, toggleIsStarred }) {

    const starredBoards = boards.filter(board => board.isStarred)

    return (
        <section className="board-list-container">
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
                </ul>
            </section>
        </section>
    )
}