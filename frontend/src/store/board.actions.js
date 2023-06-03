import { boardService } from '../services/board.service.local.js'
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
  ADD_BOARD,
  REMOVE_BOARD,
  SET_BOARDS,
  //   UNDO_REMOVE_BOARD,
  UPDATE_BOARD,
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

export async function loadBoards() {
  try {
    const boards = await boardService.query()
    // console.log('Boards from DB:', boards)
    store.dispatch({
      type: SET_BOARDS,
      boards,
    })
  } catch (err) {
    console.log('Cannot load boards', err)
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

export function updateBoard(board) {
  return boardService
    .save(board)
    .then((savedBoard) => {
      console.log('Updated Board:', savedBoard)
      store.dispatch(getActionUpdateBoard(savedBoard))
      return savedBoard
    })
    .catch((err) => {
      console.log('Cannot save board', err)
      throw err
    })
}

export async function saveTask(boardId, groupId, task, activity) {
  try {
    const savedBoard = await boardService.saveTask(boardId, groupId, task, activity)
    console.log('Saved task', task)
    store.dispatch(getActionUpdateBoard(savedBoard))
  } catch (err) {
    console.log('Cannot save task', err)
    throw err
  }
  // commit(ACTION) // dispatch(ACTION)
}
