import { boardService } from '../services/board.service.js'
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
  ADD_BOARD,
  REMOVE_BOARD,
  SET_BOARDS,
  //   UNDO_REMOVE_BOARD,
  UPDATE_BOARD,
  SET_BOARD,
  SET_LABELS_OPEN,
} from './board.reducer.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  }
}

export function getActionAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  }
}

export function getActionUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  }
}

export function getActionSetLabelsOpen(labelsOpen) {
  return {
    type: SET_LABELS_OPEN,
    labelsOpen,
  }
}

export async function loadBoards() {
  try {
    const boards = await boardService.query()
    store.dispatch({
      type: SET_BOARDS,
      boards,
    })
    return boards
  } catch (err) {
    console.log('Cannot load boards', err)
    throw err
  }
}

export function setCurrBoard(board) {
  try {
    store.dispatch({
      type: SET_BOARD,
      board,
    })
  } catch (err) {
    console.log('Cannot set board', err)
    throw err
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId)
    store.dispatch(getActionRemoveBoard(boardId))
  } catch (err) {
    console.log('Cannot remove board', err)
    throw err
  }
}
export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    console.log('Added Board', savedBoard)
    store.dispatch(getActionAddBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log('Cannot add board', err)
    throw err
  }
}

export async function updateBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    store.dispatch(getActionUpdateBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log('Cannot save board', err)
    throw err
  }
}

export function setLabelsOpen(isOpen) {
  try {
    store.dispatch(getActionSetLabelsOpen(isOpen))
  } catch (err) {
    console.log('Cannot save board', err)
    throw err
  }
}

export async function saveTask(board, updatedTask, activity) {
  try {
    const savedBoard = await boardService.saveTask(board, updatedTask, activity)
    store.dispatch(getActionUpdateBoard(savedBoard))
  } catch (err) {
    console.log('Cannot save task', err)
    throw err
  }
}

export async function saveNewTask(board, groupId, updatedTask, activity) {
  try {
    const savedBoard = await boardService.saveNewTask(board, groupId, updatedTask, activity)
    store.dispatch(getActionUpdateBoard(savedBoard))
  } catch (err) {
    console.log('Cannot save task', err)
    throw err
  }
}
