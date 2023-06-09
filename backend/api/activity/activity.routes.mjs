import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

import { addActivity, getActivities, deleteActivity } from './activity.controller.mjs'
const router = express.Router()

router.get('/:boardId', log, getActivities)
router.post('/', log, requireAuth, addActivity)
router.delete('/:id', requireAuth, deleteActivity)
// router.post('/', log, requireAuth, addActivity)
// router.delete('/:id', requireAuth, deleteActivity)

export const activityRoutes = router
