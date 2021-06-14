const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.APP_PORT || 3030;

var indexRouter = require('./src/routes/index');

app.use('/api', indexRouter);

app.listen(port, function(){
    console.log(`El servidor esta funcionando sobre http://localhost:${port}`)
})