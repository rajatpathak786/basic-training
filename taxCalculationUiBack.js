const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const orderDatabase = require('./models').orderData;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
let  category, length, name, quantity, imported, tax = 0, totalPrice = 0, invoice, price = 0, indexOfAt, order, stat, yourOrder;
app.post('/', function(req, res, next) { 
  if (req.headers["content-type"] == "text/plain") {
  console.log(req.body);
  let arry = req.body.split('\n');
  order = arry[0].split(':');
  [order,] = order;
  arry.splice(0,1);
  let len = arry.length;
  let ret = toJason(arry,order,len);
  yourOrder = toText(ret);
  let b = bill(ret);
  const obj = toDatabase(order, yourOrder, b.invoice, parseFloat(tax.toFixed(2)), parseFloat(totalPrice.toFixed(2)));
  orderDatabase.create({
    order: obj.order,
    yourorder: obj.yourOrder,
    invoice: obj.invoice,
    tax: obj.tax,
    totalAmount: obj.totalPrice
  }).then(() => console.log('database insertion sucsessfull'));
  res.send(b.stat);
  } else {      
    next ();
  } 
}),
app.post('/', function(req,res) {
  if (req.headers["content-type"] == "application/json") {
  let b = bill(req.body);
  order = req.body.name;
  yourOrder = toText(req.body);
  const obj = toDatabase(order, yourOrder, b.invoice, parseFloat(tax.toFixed(2)), parseFloat(totalPrice.toFixed(2)));
  orderDatabase.create({
    order: obj.order,
    yourOrder: obj.yourOrder,
    invoice: obj.invoice,
    tax: obj.tax,
    totalAmount: obj.totalPrice
  }).then(() => console.log('database insertion sucsessfull'));
  res.send(b.stat);
  }
});
app.listen(3000,"127.0.0.2");
let bill = (ret) => {
  stat = ret.name;
  invoice = ret.name;
  let l = ret.items.length;
  for(let i = 0; i < l; ++i) {
    let basePrice = parseFloat(ret.items[i].price);
    if ((ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 1)) {
      price = basePrice * 0.05 + basePrice;
      tax = tax + price - basePrice;
      totalPrice = totalPrice + price; 
    } else if (((ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 0)) || ((ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && !(ret.items[i].hasOwnProperty("imported") ))) {
      price = basePrice;
      tax = tax + 0; 
      totalPrice = totalPrice + price;   
    } else if (!(ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 1)) {
      price = basePrice * 0.05 + basePrice * 0.1 + basePrice;
      tax = tax + price - basePrice;
      totalPrice = totalPrice + price; 
    } else if ((!(ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 0)) || !(ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && !(ret.items[i].hasOwnProperty("imported"))) {
      price = basePrice * 0.1 + basePrice;
      tax = tax + price - basePrice;
      totalPrice = totalPrice + price; 
    } 
    stat = `${stat}<br/>${ret.items[i].quantity} ${ret.items[i].name}: ${price.toFixed(2)}`;
    invoice = `${invoice}\n${ret.items[i].quantity} ${ret.items[i].name}: ${price.toFixed(2)}`;    
  }
  stat = `${stat}<br/>Sales Taxes: ${parseFloat(tax.toFixed(2))}<br/>Total: ${parseFloat(totalPrice.toFixed(2))}`; 
  invoice = `${invoice}\nSales Taxes: ${parseFloat(tax.toFixed(2))}\nTotal: ${parseFloat(totalPrice.toFixed(2))}`;
  return {stat: stat, invoice: invoice};
}
let toJason = (arry, order, len) => {  
  let ord = {"name": order, "items": []};
  for (let i = 0; i < len; ++i) {
    let arr = arry[i].split(' ');
    length = arr.length;
    [quantity,] = arr;
    indexOfAt = arr.indexOf('at');
    name = arr.slice(1, indexOfAt);
    name = name.join(' ');
    price = arr[length - 1];
    if (arr.includes('imported')) {
      imported = true;
    } else {
      imported = false;
    }
    if (arr.includes('book')){
      category = 'book';
    } else if (arr.includes('chocolate') || arr.includes('chocolates')) {
      category = 'food';
    } else if (arr.includes('music')){
      category = 'music';
    } else if (arr.includes('perfume')) {
      category = 'perfume';
    } else if (arr.includes('pills')) {
      category = 'medicine';
    } 
    ord.items.push ({"name": name ,"category": category,"quantity": quantity,"price": price,"imported": imported});
  }
  return ord;
}
let toText = (yourOrderJson) => {
  let traverse = 0;
  let length = yourOrderJson.items.length;
  if((yourOrderJson.items[traverse].imported == false) || !(yourOrderJson.items[traverse].hasOwnProperty('imported'))) {
    yourOrder = `${yourOrderJson.items[traverse].quantity} ${yourOrderJson.items[traverse].name} at ${yourOrderJson.items[traverse].price}`;
  } else {
    yourOrder = `${yourOrderJson.items[traverse].quantity} imported ${yourOrderJson.items[traverse].name} at ${yourOrderJson.items[traverse].price}`;
  }
  ++traverse;
  for (traverse; traverse < length; traverse++) {
    if ((yourOrderJson.items[traverse].imported == false) || !(yourOrderJson.items[traverse].hasOwnProperty('imported'))) {
      yourOrder = `${yourOrder}\n${yourOrderJson.items[traverse].quantity} ${yourOrderJson.items[traverse].name} at ${yourOrderJson.items[traverse].price}`;
    } else {
      yourOrder = `${yourOrder}\n${yourOrderJson.items[traverse].quantity} imported ${yourOrderJson.items[traverse].name} at ${yourOrderJson.items[traverse].price}`;
    }  
  }
  return yourOrder;
}
let toDatabase = (order, yourOrder, invoice, tax, totalPrice) => {
  const obj = {order: order, yourOrder: yourOrder, invoice: invoice, tax: tax, totalPrice: totalPrice};
  return obj;
}





