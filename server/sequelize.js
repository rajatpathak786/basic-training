import Sequelize from 'sequelize'
const config = require('../config/app')

const sequelize = new Sequelize(config.get('db.name'), config.get('db.user'), config.get('db.password'), config.get('db.port'), {
  host: config.get('db.host'),
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export default sequelize
