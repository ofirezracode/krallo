import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

import {addReview, getReviews, deleteReview} from './review.controller.mjs'
const router = express.Router()

router.get('/', log, getReviews)
router.post('/',  log, requireAuth, addReview)
router.delete('/:id',  requireAuth, deleteReview)

export const reviewRoutes = router