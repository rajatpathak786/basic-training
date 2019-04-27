import * as server from './server'

const logErrors = (error) => {
  server.logger.error(error.message, { stack: error.stack })
  throw error
}

process.on('uncaughtException', logErrors)
process.on('unhandledRejection', (error) => {
  console.log(error)
})
const express = require('express');
const app = express();
const route = require('./projectRoutes/routes');
//const model = require('./models');
require('babel-register')({
    presets: [ 'env' ]
})
app.use('/',route);
app.listen(4566,"127.0.0.9");

server.app.start()
