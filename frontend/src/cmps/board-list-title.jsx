import { BsPerson } from "react-icons/bs";

export default function BoardListTitle({ title }) {
    return (
        <div className="title flex center">
            <BsPerson className="title-icon" strokeWidth={'.5px'} />
            <h1>{title}</h1>
        </div>
    )
}