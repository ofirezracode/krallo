import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const server = http.createServer(app)
console.log('server', server)
// Express App Config
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// routes
import { authRoutes } from './api/auth/auth.routes.mjs'
import { userRoutes } from './api/user/user.routes.mjs'
import { activityRoutes } from './api/activity/activity.routes.mjs'
import { boardRoutes } from './api/board/board.routes.mjs'
import { setupSocketAPI } from './services/socket.service.mjs'

import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.mjs'
app.all('*', setupAsyncLocalStorage)
console.log('authRoutes', authRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/board', boardRoutes)
setupSocketAPI(server)

app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

import { logger } from './services/logger.service.mjs'
const port = process.env.PORT || 3030
server.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
