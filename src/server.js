/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/
const creditCard = require('./creditCard');
const parentUser = require('./parentUser');
const childUser  = require('./childUser');
const driverUser = require('./driverUser');
const car        = require('./car');
const driverSchedule = require('./driverSchedule');
const rideSchedule = require('./rideSchedule');
//create main objects

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
const session = require('express-session');

var sess; 

//create the mysql connection object.  
// var connection = mysql.createConnection({
//   //db is the host and that name is assigned based on the 
//   //container name given in the docker-compose file
//   host: 'db',
//   port: '3306',
//   user: 'user',
//   password: 'password',
//   database: 'db'
// });
//CREATE DATABASE
const db = mysql.createConnection({
  host: 'db',
  user: 'user',
  port: '3306',
  database: 'db',
  password: 'password'
})
//CONNECT TO DATABASE
db.connect((err) => {
  if(err) {
    throw err;
  }
  logger.info('Connected to the database');
})
global.db = db; //probably bad coding but this is how we are getting db to other files
//set up some configs for express. 
const config = {
  name: 'sample-express-app',
  port: 3000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();
app.set('trust proxy', 1); 
app.use(session({
   secret: 'DB project',
   resave: false,
   saveUninitialized: true,
}));

//create a logger object.  Using logger is preferable to simply writing to the console. 
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

/**     REQUEST HANDLERS       lets get rid of these soon */ 

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000/setupdb first. Then Go to localhost:3000/checkdb');
});
 
// login
app.get('/login', (req, res) => {
  sess = req.session;
  res.status(200).send('You logged in');
});

app.get('/login_driver', (req, res) => {

});


var auth = function(req, res, next) {
  if (sess)
    return next();
  else
    return res.sendStatus(401);
};


//GET /setupdb
app.get('/setupdb', (req, res) => {
  app.get('/setupDriver');
  app.get('/setup_parent');
  app.get('/setup_cc');
  app.get('/setupCar');
  res.status(200).send('created the driver, parent, credit card, and car tables');
});

//api endpoints
app.post('/saveCreditCard', creditCard.saveCreditCard);
app.post('/setupCc', creditCard.setup_cc);
app.get('/getCreditCard', creditCard.getCreditCard);
app.post('/setupChild', childUser.setupChild);
app.post('/addChild', childUser.addChild);
app.post('/updateChild', childUser.updateChild);
app.get('/getChild', childUser.getChild);
app.get('/getChildHealthConditions', childUser.getChildHealthConditions);
app.get('/getChildEmergencyContact', childUser.getChildEmergencyContact);
app.get('/getChildBio', childUser.getChildBio);
app.post('/setupCar', car.setupCar);
app.post('/addCar', car.addCar);
app.get('/getCarModel', car.getCarModel);
app.get('/getCarAccidents', car.getCarAccidents);
app.get('/getCarFeatures', car.getCarFeatures);
app.get('/getCarLicence', car.getCarLicence);
app.get('/getCarSeats', car.getCarSeats);
app.get('/getCarService', car.getCarService);
app.get('/getCarState', car.getCarState);
app.post('/updateCarService', car.updateCarService);
app.post('/updateCarAccidents', car.updateCarAccidents);



//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
module.exports = app;
module.exports = db;