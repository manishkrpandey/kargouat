var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const serverProperties = require('./src/module/config/server-config')

const userRoute = require('./src/module/user-management/routes/user');

var app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// cors configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // forward request to route
    app.use('/user', userRoute);


  app.use((error, req, res, next) => {
    console.log('app.js error excuted')
    // console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
  });

  // connect with mongodb
  mongoose
  .connect(
    serverProperties.endPointURL, { useNewUrlParser: true }
  )
  .then(result => {
      const portNumber = process.env.PORT || 8080;
      if(!module.parent) {
        app.listen(portNumber, () => console.log(`Listening on port ${portNumber}...`));
      }
  })
  .catch(err => console.log(err));

