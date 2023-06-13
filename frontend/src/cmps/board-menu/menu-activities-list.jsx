import React from 'react'
import { colorService } from '../../services/color.service'
import { utilService } from '../../services/util.service'

export function MenuActivitiesList({ board, activities }) {
    if (!activities) return <div></div>
    return (
        <>
            {activities.map(activity =>
                <div className='activity-preview flex' key={activity._id}>
                    {activity.fromUser.imgUrl && <img src={activity.fromUser.imgUrl} alt={activity.fromUser.fullname} />}

                    {!activity.fromUser.imgUrl && <div className='no-img-url' style={{ backgroundColor: colorService.getRandomColor() }}>
                        {activity.fromUser.fullname.charAt(0).toUpperCase()}
                    </div>}
                    <div className="activity-content flex column">
                        <div className='txt flex row'>
                            <p><span><h4>{activity.fromUser.fullname}</h4></span>{activity.txt}</p>
                        </div>
                        <p className='date'>{utilService.formatTime(activity.createdAt)}</p>
                    </div>
                </div>)}
        </>
    )
}
