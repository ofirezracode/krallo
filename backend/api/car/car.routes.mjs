import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getCars, getCarById, addCar, updateCar, removeCar, addCarMsg, removeCarMsg } from './car.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getCars)
router.get('/:id', getCarById)
router.post('/', requireAuth, addCar)
router.put('/:id', requireAuth, updateCar)
router.delete('/:id', requireAuth, removeCar)
// router.delete('/:id', requireAuth, requireAdmin, removeCar)

router.post('/:id/msg', requireAuth, addCarMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

export const carRoutes = router
