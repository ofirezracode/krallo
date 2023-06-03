import React from 'react'
import GroupPreview from './group-preview'
import AddGroup from './add-group'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function GroupList({ groups, onUpdateGroupTitle, onAddGroup }) {
  function onDragEnd(result) {
    console.log('result', result)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className="group-list clean-list flex">
        {groups.map((group) => (
          <Droppable key={group._id} droppableId={group._id}>
            {(provided) => (
              <li key={group._id} {...provided.droppableProps} ref={provided.innerRef}>
                <GroupPreview group={group} onUpdateGroupTitle={onUpdateGroupTitle} provided={provided} />
              </li>
            )}
          </Droppable>
        ))}
        <li key={'add-group'}>
          <AddGroup onAddGroup={onAddGroup} />
        </li>
      </ul>
    </DragDropContext>
  )
}

export default GroupList
