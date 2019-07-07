const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydatabase', 'postgres', '123', {
  host : 'localhost',
  dialect : 'postgres'    
});
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
sequelize.sync({ force: false }).then(() => {
  console.log('Database & table created');
});
const orderTable = sequelize.define('ordertable', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ordername: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yourorder: {
    type: Sequelize.STRING,
    allowNull: false
  },
  invoice: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tax: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  totalAmount: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});
let insertIntoTable = (obj) => {
  orderTable.create ({
  ordername: obj.order,
  yourorder: obj.yourOrder,
  invoice: obj.invoice,
  tax: obj.tax,
  totalAmount: obj.totalPrice
}).then(()=>console.log('database insertion sucsessfull'));
}
module.exports = {
  insertIntoTable,
  orderTable
}