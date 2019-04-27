const convict = require('convict')
const validate = require('validate.js')

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
    doc: 'level of logs to show',
    format: String,
    default: '',
    env: 'LOG_LEVEL'
    },
    db: {
      host: "127.0.0.1",
      name: "mydatabase",
      password: "123",
      user: "postgres",
      port: "5432"
    }

    /*log_level: {
    'info': 0,
    'ok': 1,
    'error': 2
  },*/
 
})

/*const database = {
  "development": {
    "username": "postgres",
    "password": "123",
    "database": "mydatabase",
    "host": "127.0.0.1",
    "port": "5432",	
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "123",
    "database": "mydatabase",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "123",
    "database": "mydatabase",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  }
} */


config.validate({ allowed: 'strict' })

module.exports = config
