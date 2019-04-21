const express = require('express');
const app = express();
const route = require('./projectRoutes/routes');
const model = require('./models');
app.use('/',route);
app.listen(4563,"127.0.0.9");