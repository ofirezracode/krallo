import { authService } from '../api/auth/auth.service.mjs'
import { asyncLocalStorage } from '../services/als.service.mjs'

export async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, () => {
    let loggedinUser = null
    if (!req.cookies.loginToken) return next()
    loggedinUser = authService.validateToken(req.cookies.loginToken)

    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.loggedinUser = loggedinUser
    }
    next()
  })
}
