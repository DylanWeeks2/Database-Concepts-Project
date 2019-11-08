/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/
var creditCard = require('./creditCard');
var parentUser = require('./parentUser');
var childUser  = require('./childUser');
var driverUser = require('./driverUser');
var car        = require('./car');
var driverSchedule = require('./driverSchedule');
var rideSchedule = require('./rideSchedule');
//create main objects

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
const session = require('express-session');

var sess; 

//create the mysql connection object.  
var connection = mysql.createConnection({
  //db is the host and that name is assigned based on the 
  //container name given in the docker-compose file
  host: 'db',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'db'
});

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
app.use('/', creditCard);
app.use('/', parentUser);
app.use('/', childUser);
app.use('/', driverUser);
app.use('/', car);
app.use('/', driverSchedule);
app.use('/', rideSchedule);

//create a logger object.  Using logger is preferable to simply writing to the console. 
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

/**     REQUEST HANDLERS        */

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
  //connection.query('insert into driver_user values(1, \'mark\')', function(err, rows, fields) {
  //    if(err)
  //      logger.error('adding row to table failed');
  //});
  res.status(200).send('created the driver and car tables');
});

//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
