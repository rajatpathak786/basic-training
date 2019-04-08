const express = require('express');
const app = express();
app.get('/loginPage', function (req, res) { 
  res.send('<p>UserName :'+req.query['username']+'</p><p>Hello World</p><html><head><title>Login Page</title></head><body onload = "myfunction()"><script>function myfunction(){alert("'+req.query['username']+' login");}</script></body></html>');  
});
app.listen(3000,'127.0.0.1');
