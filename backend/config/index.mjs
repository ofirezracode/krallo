import configProd from './prod.mjs'
import configDev from './dev.mjs'


export var config

if (false && process.env.NODE_ENV === 'production') {
  config = configProd
} else {
  config = configDev
}
config.isGuestMode = true


