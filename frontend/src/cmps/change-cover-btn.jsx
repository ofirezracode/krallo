import { BsSquareHalf } from "react-icons/bs";

export function ChangeCoverBtn({ coverChangeBtnRef, onOpenPopover, possibleCoverColors, task, onStyleChange }) {
    return (
        <button
            ref={coverChangeBtnRef}
            onClick={(e) => onOpenPopover(e, { colors: possibleCoverColors, coverStyle: task?.style, onStyleChange }, 'cover', 'Cover')}
            className="flex center">
            <BsSquareHalf className="box-icon" />
            <p>Cover</p>
        </button>
    )
}