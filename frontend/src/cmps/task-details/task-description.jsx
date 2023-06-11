import { useState } from 'react'
import DescIcon from '../../assets/img/svg/desc-icon.svg'

export function TaskDescription({ task }) {
    const handleFocus = (ev) => ev.target.select()
    const [isEditing, setIsEditing] = useState(false)
    if (!task.description) return <div></div>
    const { description } = task

    function toggleEditing() {
        setIsEditing(!isEditing)
    }

    return (
        <section className="task-description">
            {description.length > 0 && <div className="desc-title flex align-center">
                <img src={DescIcon} alt="desc-icon" />
                <h3>Description</h3>
                <button className='btn'>Edit</button>
            </div>}

            <p>{task.description}</p>
        </section>
    )
}