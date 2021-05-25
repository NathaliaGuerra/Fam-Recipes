const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.port || 3030;

app.listen(port, function(){
    console.log(`El servidor esta funcionando sobre http://localhost:${port}`)
})