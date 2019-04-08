const express = require('express');
const app = express();
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: true }));
app.get('/login', function(req, res) {
  res.send(''+req.query['username']+' has logged in');    
});
app.post('/signUp', function(req,res) {
  res.send('USERNAME :'+req.body.username+'<br/>PASSWORD :'+req.body.password+'');
});
app.post('/forgetPassword',function(req,res){
  res.send('USERNAME :'+req.body.username+'<br/>PASSWORD :'+req.body.password+'<html><head></head><body onload = "myfunction()"><script>function myfunction(){alert("password changed successfully");}</script></body></html>');
});
app.listen(3010,'127.0.0.8');
