import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getBoards, getBoardById, addBoard, updateBoard, removeBoard } from './board.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:id', getBoardById)
// router.post('/', addBoard)
// router.put('/:id', updateBoard)
// router.delete('/:id', removeBoard)
router.post('/', requireAuth, addBoard)
router.put('/:id', requireAuth, updateBoard)
router.delete('/:id', requireAuth, removeBoard)

// router.delete('/:id', requireAuth, requireAdmin, removeBoard)
// router.post('/:id/msg', requireAuth, addBoardMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeBoardMsg)

export const boardRoutes = router
