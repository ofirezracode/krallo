import configProd from './prod.mjs'
import configDev from './dev.mjs'

export let config

if (process.env.NODE_ENV === 'production') {
  config = configProd
} else {
  config = configDev
}
