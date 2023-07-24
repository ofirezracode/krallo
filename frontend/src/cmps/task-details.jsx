import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'
import { ShowTaskDetails } from './task-details/show-task-details'
import { HiXMark } from 'react-icons/hi2'
import { TaskCover } from './task-details/task-cover'
import { TaskDetailsHeader } from './task-details/task-details-header'
import { ActionsList } from './task-details/actions-list'
import { saveTask, updateBoard } from '../store/board.actions'
import { activityService, createActivity } from '../services/activity.service'
import { TaskAttachments } from './task-details/task-attachments'
import { ChecklistIndex } from './task-details/checklist/checklist-index'
import { utilService } from '../services/util.service'
import { addActivity } from '../store/activity.actions'
import { TaskDescription } from './task-details/task-description'
import { TaskActivities } from './task-details/task-activities'
import { MenuActivitiesList } from './board-menu/menu-activities-list'

export function TaskDetails() {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const user = useSelector((storeState) => storeState.userModule.user)
  const { taskId, boardId } = useParams()
  const [task, setTask] = useState(null)
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()
  const activities = useSelector((storeState) => storeState.activityModule.activities)
  const taskDetails = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    if (board) {
      setTask(boardService.getTaskById(board ? board : [], taskId))
    }
  }, [board, taskId])

  function onOpenPopover(e, props, type) {
    closePopover()
    props.refElement = taskDetails.current
    setAddedProps(props)
    openPopover(e, type)
  }

  async function onHandleTaskMembers(activityType, member) {
    try {
      let activity = activityService.createActivity(board._id, activityType, user, task)
      const updatedTask = boardService.toggleMemberOnTask(task, member, activityType)
      await saveTask(board, updatedTask, activity)
      await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onChangeTitle(title) {
    try {
      const updatedTask = { ...task, title }
      await saveTask(board, updatedTask)
      setTask(updatedTask)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onUpdateChecklists(updatedChecklists, activityType) {
    try {
      const updatedTask = { ...task, checklists: updatedChecklists }
      const activity = activityService.createActivity(board._id, activityType, user, task)
      await saveTask(board, updatedTask, activity)
      await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onAddChecklist(title) {
    try {
      const activity = activityService.createActivity(board._id, 'add-checklist', user, task)
      const newChecklist = { _id: utilService.makeId(), title, todos: [] }
      const newChecklists = [...task.checklists, newChecklist]
      const updatedTask = { ...task, checklists: newChecklists }
      await saveTask(board, updatedTask, activity)
      await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onStyleChange(newStyle) {
    try {
      const updatedTask = { ...task, style: newStyle }
      await saveTask(board, updatedTask)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onDescriptionUpdate(description) {
    try {
      const updatedTask = { ...task, description }
      const activity = activityService.createActivity(board._id, 'updated-description', user, task)
      await saveTask(board, updatedTask, activity)
      await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onAttachmentAdded(attachments, newAttach) {
    try {
      const updatedTask = { ...task, attachments }
      const activity = activityService.createActivity(board._id, 'add-attachment', user, task, newAttach.title)
      await saveTask(board, updatedTask, activity)
      await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onDeleteAttachment(attachId) {
    try {
      const attachIdx = task.attachments.findIndex((attachment) => attachId === attachment._id)
      const updatedTask = task.attachments.splice(attachIdx, 1)
      const activity = activityService.createActivity(board._id, 'delete-attachment', user, task)
      await saveTask(board, updatedTask, activity)
      await addActivity(activity)
    } catch (err) {
      console.error('err', err)
    }
  }

  async function onEditAttachment(attachId, title) {
    try {
      const attachmentIdx = task.attachments.findIndex((attachment) => attachId === attachment._id)
      if (task.attachments[attachmentIdx].title === title) return
      const updatedAttachment = { ...task.attachments[attachmentIdx], title }
      const updatedAttachments = [...task.attachments]
      updatedAttachments[attachmentIdx] = updatedAttachment
      const updatedTask = { ...task, attachments: updatedAttachments }

      await saveTask(board, updatedTask)
    } catch (err) {
      console.error('err', err)
    }
  }

  async function onDueDateSave(dueDate) {
    try {
      const updatedTask = { ...task, dueDate }
      await saveTask(board, updatedTask)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onLabelDelete(editedBoardLabels, labelToDelete) {
    try {
      let newBoard = { ...board, labels: editedBoardLabels }
      newBoard = boardService.removeLabelFromTasks(newBoard, labelToDelete._id)
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onLabelChange(board, newLabelIds) {
    try {
      const updatedTask = { ...task, labelIds: newLabelIds }
      await saveTask(board, updatedTask)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onLabelEdit(editedBoardLabels) {
    try {
      const newBoard = { ...board, labels: editedBoardLabels }
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onLabelDelete(editedBoardLabels, labelToDelete) {
    try {
      let newBoard = { ...board, labels: editedBoardLabels }
      newBoard = boardService.removeLabelFromTasks(newBoard, labelToDelete._id)
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <section className="task-details-screen">
      {/* <div className="backdrop"></div> */}
      <article ref={taskDetails} className="task-details">
        <button onClick={() => navigate(`/board/${boardId}`)} className="close-btn">
          <HiXMark className="close-icon" />
        </button>
        <TaskCover
          task={task}
          taskDetails={taskDetails}
          onStyleChange={onStyleChange}
        />
        <TaskDetailsHeader board={board} onChangeTitle={onChangeTitle} />
        <section className="task-details-container">
          <section className="card-details-container flex column">
            <ShowTaskDetails
              task={task}
              board={board}
              onOpenPopover={onOpenPopover}
              onLabelChange={onLabelChange}
              onLabelEdit={onLabelEdit}
              onLabelDelete={onLabelDelete}
              onDueDateSave={onDueDateSave}
            />
            <TaskDescription
              task={task}
              onDescriptionUpdate={onDescriptionUpdate}
            />
            <TaskAttachments
              task={task}
              onAttachmentAdded={onAttachmentAdded}
              onDeleteAttachment={onDeleteAttachment}
              onEditAttachment={onEditAttachment}
              onOpenPopover={onOpenPopover}
              onStyleChange={onStyleChange}
            />
            <ChecklistIndex
              task={task}
              onOpenPopover={onOpenPopover}
              onUpdateChecklists={onUpdateChecklists}
            />
            {/* <TaskActivities /> */}
            {/* <div className="activity-list">
              < MenuActivitiesList board={board} activities={activities} />
            </div> */}
          </section>
          <ActionsList
            task={task}
            onHandleTaskMembers={onHandleTaskMembers}
            onOpenPopover={onOpenPopover}
            board={board}
            onAttachmentAdded={onAttachmentAdded}
            onLabelChange={onLabelChange}
            onLabelEdit={onLabelEdit}
            onLabelDelete={onLabelDelete}
            onAddChecklist={onAddChecklist}
            onStyleChange={onStyleChange}
            onDueDateSave={onDueDateSave}
          />
        </section>
        <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />
      </article>
    </section>
  )
}
