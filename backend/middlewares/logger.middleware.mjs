import {logger} from '../services/logger.service.mjs'

export async function log(req, res, next) {
  logger.info('Sample Logger Middleware')
  next()
}

