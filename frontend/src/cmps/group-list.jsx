import React, { useEffect } from 'react'
import GroupPreview from './group-preview'
import AddGroup from './add-group'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { loadBoards } from '../store/board.actions'

function GroupList({ board, onDndTask, onUpdateGroupTitle, onAddGroup }) {

  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { groups } = board

  useEffect(() => {
    loadBoards()
  }, [])

  function onDragEnd(result) {
    console.log('result', result)
    if (!result.destination) return
    const { source, destination, draggableId } = result
    const sourceGroupId = source.droppableId
    const destGroupId = destination.droppableId
    const taskSourceIndex = source.index
    const taskDestIndex = destination.index
    onDndTask(sourceGroupId, destGroupId, taskSourceIndex, taskDestIndex)
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
