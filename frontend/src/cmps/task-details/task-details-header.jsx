import { BsFillCreditCardFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export function TaskDetailsHeader({ task }) {
    return (
        <header className="task-header flex">
            <div className="title-img">
                <BsFillCreditCardFill className="card-title-img" />
            </div>
            <div className="task-title">
                <h1>{task.title}</h1>
                <p>
                    in list <Link>Code Review</Link>
                </p>
            </div>
        </header>
    )
}