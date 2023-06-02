import BoardPreview from "./board-preview";
import BoardListTitle from "./board-list-title";

export default function BoardList({ boards, toggleIsStarred }) {

    const starredBoards = boards.filter(board => board.isStarred)

    return (
        <section className="board-list-container">
            <BoardListTitle title={'Starred boards'} />
            <section className="board-list">
                <ul className="starred-board-list clean-list flex wrap">
                    <BoardPreview boards={starredBoards} toggleIsStarred={toggleIsStarred} />
                </ul>
            </section>
            <BoardListTitle title={'Your boards'} />
            <section className="board-list">
                <ul className="starred-board-list clean-list flex wrap">
                    <li className="new-board">
                        {/* <Link to={`/board/${board._id}`}> */}
                        <article className="flex align-center justify-center">
                            <p>Create new board</p>
                        </article>
                        {/* </Link> */}
                    </li>
                    <BoardPreview boards={boards} toggleIsStarred={toggleIsStarred} />
                </ul>
            </section>
        </section>
    )
}