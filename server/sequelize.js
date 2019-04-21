const Sequelize = require('sequelize');
const sequelize = new Sequelize('public', 'postgres', '123', {
  host: '127.0.0.9',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize;
