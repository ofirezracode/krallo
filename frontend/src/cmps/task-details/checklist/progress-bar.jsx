import React from 'react'

export function ProgressBar({checklist}) {
    return (
        <div className='checklist-progress'>
            <span>0%</span>
            <div className='checklist-progress-bar'>
                <div className='progress-bar'>
                    <div className='progress-bar-current'></div>
                </div>
            </div>
        </div>
    )
}
