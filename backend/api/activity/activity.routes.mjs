import express from 'express'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.mjs'

import { addActivity, getActivities, deleteActivity } from './activity.controller.mjs'
const router = express.Router()

router.get('/:boardId', getActivities)
router.post('/', requireAuth, addActivity)
router.delete('/:id', requireAuth, requireAdmin, deleteActivity)

export const activityRoutes = router
