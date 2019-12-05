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
const reviews    = require('./reviews');
const accounts = require('./accounts');
const services = require('./service');
const accidents = require('./accident');
const availabilities = require('./availability');
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
 

app.get('/login_driver', (req, res) => {

});


var auth = function(req, res, next) {
  if (sess)
    return next();
  else
    return res.sendStatus(401);
};


//GET /setupdb
app.post('/setupdb', (req, res) => {
  console.log("setting up db");
  let query = "DROP TABLE if exists rideSchedule";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table rideSchedule")
      }
  });
  query = "DROP TABLE if exists rideSchedule";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table rideSchedule")
      }
  });
  query = "DROP TABLE if exists driverSchedule";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table driverSchedule")
      }
  });
  query = "DROP TABLE if exists review";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table review")
      }
  });
  query = "DROP TABLE if exists accounts";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table accounts")
      }
  });
  query = "DROP TABLE if exists creditCard";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table creditCard")
      }
  });
  query = "DROP TABLE if exists childUser";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log(err);
    }
    else{
        console.log("deleted table Childuser")
      }
  });
  query = "DROP TABLE if exists accidents";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table accidents")
      }
  });
  query = "DROP TABLE if exists services";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table services")
      }
  });
  query = "DROP TABLE if exists availabilities";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table availabilities")
      }
  });
  query = "DROP TABLE if exists driverUser";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log("NO DELETION");
    }
    else{
        console.log("deleted table driverUser")
      }
  });
  query = "DROP TABLE if exists parentUser";
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log(err);
    }
    else{
        console.log("deleted table parentUser")
      }
  });
  parentUser.setupParent(req, res);
  driverUser.setupDriver(req,res);
  childUser.setupChild(req, res);
  accounts.setupAccounts(req, res);
  reviews.setupReviews(req, res);
  driverSchedule.setupDriverSchedule(req, res);
  rideSchedule.setupRideSchedule(req, res);
  creditCard.setupCreditCard(req, res);
  services.setupService(req, res);
  accidents.setupAccident(req, res);
  availabilities.setupAvailiability(req, res);

  res.status(200).send('created the driver, parent, credit card, and car tables');
});

//api endpoints
//accounts
app.post('/setupAccounts', accounts.setupAccounts);
app.get('/login', accounts.login);
app.put('/changePassword', accounts.changePassword);
//creditCard
app.post('/setupCreditCard', creditCard.setupCreditCard);
app.post('/saveCreditCard', creditCard.saveCreditCard);
app.get('/getCreditCard', creditCard.getCreditCard);
//parentUser
app.post('/setupParent', parentUser.setupParent);
app.get('/getParentAndChildInfo', parentUser.getParentAndChildInfo);
app.post('/addParent', parentUser.addParent);
app.get('/getParent', parentUser.getParent);
//driverUser
app.post('/setupDriver', driverUser.setupDriver);
//app.put('/changeDriverPassword', driverUser.changeDriverPassword);
app.post('/addDriver', driverUser.addDriver);
app.put('/updateDriver', driverUser.updateDriver);
app.get('/getDriver', driverUser.getDriver);
//accidents
app.post('/addAccident', accidents.addAccident);
app.get('/getAccidents', accidents.getAccidents);
//availabilities
app.post('/addAvailability', availabilities.addAvailability);
app.get('/getAvailabilities', availabilities.getAvailabilities);
//services
app.post('/addService', services.addService);
app.get('/getServices', services.getServices);
//childUser
app.post('/setupChild', childUser.setupChild);
app.post('/addChild', childUser.addChild);
app.put('/updateChild', childUser.updateChild);
app.get('/getChild', childUser.getChild);
//car
app.post('/setupCar', car.setupCar);
app.post('/addCar', car.addCar);
app.get('/getCar', car.getCar);
app.put('/updateCar', car.updateCar);
//driverSchedule
app.post('/setupDriverSchedule', driverSchedule.setupDriverSchedule);
app.post('/addDriverSchedule', driverSchedule.addDriverSchedule);
app.put('/setDriverScheduleStatus', driverSchedule.setDriverScheduleStatus);
app.get('/getAvailableDrivers', driverSchedule.getAvailableDrivers);
//rideSchedule
app.post('/setupRideSchedule', rideSchedule.setupRideSchedule);
app.post('/addRideSchedule', rideSchedule.addRideSchedule);
app.post('/deleteRideSchedule', rideSchedule.deleteRideSchedule);
app.put('/updateRideSchedule', rideSchedule.updateRideSchedule);
app.get('/getRideSchedule', rideSchedule.viewRideSchedule);
app.get('/getDriverSchedule', rideSchedule.getDriverSchedule);
//reivews
app.post('/setupReviews', reviews.setupReviews);
app.post('/addReview', reviews.addReview);
app.get('/getReviews', reviews.getReviews);



//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
module.exports = app;
module.exports = db;
