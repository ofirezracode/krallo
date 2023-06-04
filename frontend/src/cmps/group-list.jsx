import React, { useEffect } from 'react'
import { GroupPreview } from './group-preview'
import { AddGroup } from './add-group'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { loadBoards } from '../store/board.actions'

export function GroupList({ board, onDndTask, onDndGroup, onUpdateGroupTitle, onAddGroup }) {
  const { groups } = board

  useEffect(() => {
    loadBoards()
  }, [])

  function onDragEnd(result) {
    if (!result.destination) return
    const { source, destination } = result
    const sourceGroupId = source.droppableId
    const destGroupId = destination.droppableId
    const taskSourceIdx = source.index
    const taskDestIdx = destination.index
    onDndTask(sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx)
    // onDndGroup(sourceGroupId, destGroupId) // Not working - need fixes
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className="group-list clean-list flex">
        {groups.map((group, idx) => (
          <Droppable key={group._id} index={idx} droppableId={group._id}>
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
