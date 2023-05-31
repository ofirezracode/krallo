import express from 'express'
import {login, signup, logout} from './auth.controller.mjs'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

export const authRoutes = router