const convict = require('convict')
const validate = require('validate')

const config = convict({
  app: {
    name: {
      doc: 'Training Application',
      format: String,
      default: 'Training Application'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4563,
    env: 'PORT'
  },
  log_level: {
    'info': 0,
    'ok': 1,
    'error': 2
  },
})

config.validate({ allowed: 'strict' })

module.exports = config
