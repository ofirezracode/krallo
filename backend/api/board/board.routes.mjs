import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { getBoards, getBoardById, addBoard, updateBoard, removeBoard } from './board.controller.mjs'

const router = express.Router()

router.get('/', getBoards)
router.get('/:id', getBoardById)
router.post('/', requireAuth, addBoard)
router.put('/:id', requireAuth, updateBoard)
router.delete('/:id', requireAuth, removeBoard)

export const boardRoutes = router
