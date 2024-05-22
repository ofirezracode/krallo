import React, { useEffect } from 'react'
import { GroupPreview } from './group-preview'
import { AddGroup } from './add-group'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { loadBoards } from '../store/board.actions'

export function GroupList({ board, onMoveTask, onMoveGroup, onUpdateGroupTitle, onAddGroup, showMenuClass, onDeleteGroup }) {
  useEffect(() => {
    loadBoards()
  }, [])

  if (!board) return <div></div>

  const { groups } = board

  function onDragEnd(result) {
    const { source, destination, type } = result
    if (!destination) return
    if (type === 'group') {
      onMoveGroup(source.index, destination.index)
      return
    }
    const sourceGroupId = source.droppableId
    const destGroupId = destination.droppableId
    const taskSourceIdx = source.index
    const taskDestIdx = destination.index

    onMoveTask(sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx)
    // onMoveGroup(sourceGroupId, destGroupId) // Not working - need fixes
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className={`group-list clean-list flex ${showMenuClass}`}>
        {groups.map((group, idx) => (
          <Droppable key={group._id} index={idx} droppableId={group._id} type="task">
            {(provided) => (
              <li key={group._id} {...provided.droppableProps} ref={provided.innerRef}>
                <GroupPreview group={group} onUpdateGroupTitle={onUpdateGroupTitle} onDeleteGroup={onDeleteGroup} provided={provided} />
                {provided.placeholder}
              </li>
            )}
          </Droppable>
        ))}
        <Droppable droppableId="all-groups" type="group">
          {(provided) => (
            <li ref={provided.innerRef} {...provided.droppableProps}>
              <AddGroup onAddGroup={onAddGroup} />
              {provided.placeholder}
            </li>
          )}
        </Droppable>
      </ul>
    </DragDropContext>
  )
}
