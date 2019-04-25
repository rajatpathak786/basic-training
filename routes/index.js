import apiRoutes from './api'

const initRoutes = (app) => {
  app.get('/healthcheck', (req, res) => {
    res.sendStatus(200)
  })
  app.use(apiRoutes)
}

export default initRoutes
