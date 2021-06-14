const express = require('express');
const app = express();
require('dotenv').config();

const passport = require("passport");

const port = process.env.APP_PORT || 3030;

var indexRouter = require('./src/routes/index');

// Swagger
const swaggerUi = require('swagger-ui-express');
const { swaggerSpect } = require('./config/swagger');

// Middleware Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));

// passport initialize and set middleware
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

// Middleware Routes
app.use('/api', indexRouter);

app.listen(port, function(){
    console.log(`El servidor esta funcionando sobre http://localhost:${port}`)
})