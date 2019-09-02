var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
 var multer = require('multer');

const serverProperties = require('./src/module/config/server-config');
const userRoute = require('./src/module/user-management/routes/user');
const vehicleRoute = require('./src/module/vehicle-management/routes/vehicle');
const driverRoute = require('./src/module/driver-management/routes/driver');
const requestRoute = require('./src/module/order-management/routes/order');

var app = express();

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename:(req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
// app.use('/images', express.static(path.join(__dirname, 'images')));


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
    app.use('/vehicle', vehicleRoute);
    app.use('/driver', driverRoute);
    app.use('/request', requestRoute);


  app.use((error, req, res, next) => {
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
      const portNumber = serverProperties.port || 8000;
      if(!module.parent) {
        app.listen(portNumber, () => console.log(`Listening on port ${portNumber}...`));
      }
  })
  .catch(err => console.log(err));

