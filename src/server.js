/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/

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

var auth = function(req, res, next) {
  if (sess)
    return next();
  else
    return res.sendStatus(401);
};


//GET /setupdb
app.get('/setupdb', (req, res) => {
  app.get('/setupDriver');
  app.get('/setupCar');
  //connection.query('insert into driver_user values(1, \'mark\')', function(err, rows, fields) {
  //    if(err)
  //      logger.error('adding row to table failed');
  //});
  res.status(200).send('created the driver and car tables');
});

//GET /setup_parent
app.get('/setup_parent', (req, res) => {
  connection.query('drop table if exists parent_user', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('create table parent_user(id varchar(4), name varchar(50), password varchar(50))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table parent_user")
  });
  connection.query('insert into parent_user values(\'1\', \'mark\', \'password\')', function(err, rows, fields) {
      if(err)
        logger.error('adding row to table failed');
  });
 
  res.status(200).send('created the parent table <p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
});

//GET /setup_cc
app.get('/setup_cc', (req, res) => {
  connection.query('drop table if exists credit_card', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('create table credit_card(expdate DATE, cc_number varchar(16), cvv varchar(4), zip_code varchar(5), parent_id varchar(4) REFERENCES parent_user(id))', function(err, rows, fields) {
    if (err)
      logger.error("Problem creating the table credit_card")
  });
  connection.query('insert into credit_card values(\'06-22-24\', \'0000000000000000\', \'999\', \'11111\' \'1\')', function(err, rows, fields) {
    if(err)
      logger.error('adding row to table failed');
  }); 
  res.status(200).send('created the credit card table');
}); 

// GET /setupDriver
app.get('/setupDriver', (req, res) => {
   //set up the driver table
   connection.query('drop table if exists driver_user', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('create table driver_user(id varchar(4), name varchar(50), bio varchar(200), cellPhone varchar(10), fingerprint tinyint(1), reported tinyint(1), password varchar(50))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table driver_user");
  });
  res.status(200).send("set up the driver");
});

// post /addDriver
app.get('/addDriver/:id/:name/:bio/:cellPhone/:fingerprint/:reported/:password', (req, res) => {
  connection.query('insert into driver_user values(?, ?, ?, ?, ?, ?, ?)',[req.params['id'],req.params['name'], req.params['bio'], req.params['cellPhone'],req.params['fingerprint'],req.params['reported'],req.params['password']], function(err,rows,fields){
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send('added given driver');
})

// GET /setupCar
app.get('/setupCar', (req, res) => {
  // set up car information
  connection.query('drop table if exists car', function (err, rows, fields) {
    if(err)
      logger.error("Can't drop table");
  });
  connection.query('create table car(id varchar(4), numSeats int, numAccidents int, service datetime(6), state varchar(50), model varchar(50), driverID varchar(4) REFERENCES driver_user(id))' , function(err,rows,fields){
    //dconstraint driverID foreign key(driver_ID) references driver_user.id',
    if(err)
      logger.error("Can't add car");
  });
 res.status(200).send("set up the driver");
});

//post /addDriver
app.get('/addCar/:numSeats/:numAccidents/:service/:state/:model/:driverID', (req, res) => {
  connection.query('insert into car values(?,?,?,?,?,?)',[req.params['numSeats'], req.params['numAccidents'] ,req.params['service'] ,req.params['state'] ,req.params['model'] ,req.params['driverID']], function(err,rows,fields){
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send('added given car');
});

//post /updatePassword
app.post('/updatePassword/:id/:pass', (req, res) => {
  connection.query('update driver_user set password = ? where id = ?', [req.params['new_password'],req.params['id']], function (err, rows, fields){
    if(err)
      logger.error('updating password failed');
  });
  res.status(200).send('updated driver password');
});

//POST /change_password
app.get('/change_password/:parent_id/:new_password', (req, res) => {
  connection.query('update parent_user set password = ? where id = ?',[req.params['new_password'], req.params['parent_id']], function (err, rows, fields) {
    if (err) {
      logger.error("failed updating password");
    };
    res.type('text/html');
    res.status(200);
    res.send('updated password');
    
  })
});

//POST /save_credit_card
app.get('/save_credit_card:parent_id/:expdate/:cc_number/:cvv/:zip_code', (req, res) => {
  connection.query('insert into credit_card values ?, ?, ?, ?, ?', [req.params['expdate'], req.params['cc_number'], req.params['cvv'], req.params['zip_code'], requ.params['parent_id']], function (err, rows, fields) {
    if(err) {
      logger.error("failed saving new credit card");
    };
  })
});

//get /createChild
app.get("/setupChild", auth, function (req, res) {
  connection.query('DROP table if exists child_user', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
    });
  connection.query('CREATE table child_user (id varchar(4), name varchar(50), parent_name varchar(50), bio varchar(200), rating DECIMAL(19,4), parent_id varchar(4) REFERENCES parent_user(id))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table child_user");
  });
  res.status(200).send('The Child has been created!!');
});

//get /addChild
app.get("/addChild/:id/:name/:parent_name/:bio/:rating/:parent_id", function (req, res) {
  connection.query('insert into child_user values(?, ?, ?, ?, ?, ?)', [req.params['id'], req.params['name'],req.params['parent_name'],req.params['bio'],req.params['rating'], req.params['parent_id']], function(err, rows, fields) {
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send("Child user has been added!");
});

//post /updateChild
app.get("/updateChild/:id/:name/:bio/:parent_name", function (req, res) {
  connection.query('update child_user set name = ?, bio = ?, parent_name = ? WHERE id = ?;', [req.params['name'], req.params['bio'], req.params['parent_name'], req.params['id']], function(err, rows, fields) {
    if(err)
      logger.error('cant update child');
  });
});

//get /viewChild
app.get('/viewChild/:name', auth, (req, res) => {
  //execute a query to select * from table named data.
  connection.query('SELECT * from child_user WHERE name = ?', [req.params['name']], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
    };
    logger.info(rows[0].name + ' ' + rows[0].id + ' ' + rows[0].parent_name + ' ' + rows[0].bio + ' ' + rows[0].rating + ' ' + rows[0].parent_id);
 
    //writing to the response object
    res.type('text/html');
    res.status(200);
    res.send('<h1>' + rows[0].name + ' ' + rows[0].id + ' ' + rows[0].parent_name + ' ' + rows[0].bio + ' ' + rows[0].rating + ' ' + rows[0].parent_id + '</h1>');
  })
});

//get /createSchedule
app.get("/setupSchedule", auth, function (req, res) {
  connection.query('DROP table if exists schedule', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
    });
  connection.query('CREATE table schedule(id varchar(4), pick_up_location varchar(50), drop_off_location varchar(50), pick_up_time datetime(6), drop_off_time datetime(6), parent_id varchar(4) REFERENCES parent_user(id), child_id varchar(4) REFERENCES child_user(id), driver_id varchar(4) REFERENCES driver_user(id))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table schedule");
  });
  res.status(200).send('The Schedule has been created!!');
});

//get /addSchedule
app.get("/addSchedule/:id/:pick_up_location/:drop_off_location/:pick_up_time/:drop_off_time/:parent_id/:child_id/:driver_id", function (req, res) {
  connection.query('insert into schedule values(?, ?, ?, ?, ?, ?, ?, ?)', [req.params['id'], req.params['pick_up_location'],req.params['drop_off_location'],req.params['pick_up_time'],req.params['drop_off_time'], req.params['parent_id'], req.params['child_id'], req.params['driver_id']], function(err, rows, fields) {
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send("A Schedule has been added!");
});

//post /deleteSchedule
app.get("/deleteSchedule/:id", function (req, res) {
  connection.query('DELETE FROM schedule WHERE id = ?;', [req.params['id']], function(err, rows, fields) {
    if(err)
      logger.error('cant DELETE Schedule!');
  res.status(200).send("Ride has been removed!!");
  });
});

//post /updateSchedule
app.get("/updateSchedule/:id/:pick_up_location/:drop_off_location/:pick_up_time/:drop_off_time", function (req, res) {
  connection.query('update schedule set pick_up_location = ?, drop_off_location = ?, pick_up_time = ?, drop_off_time = ? WHERE id = ?;', [req.params['pick_up_location'], req.params['drop_off_location'], req.params['pick_up_time'], req.params['drop_off_time'],  req.params['id']], function(err, rows, fields) {
    if(err)
      logger.error('cant update child');
      res.status(200).send("Schedule UPDATED!!");
  });
});

//get /viewSchedule
app.get('/viewSchedule/:child_id', auth, (req, res) => {
  //execute a query to select * from table named data.
  connection.query('SELECT * from schedule WHERE child_id = ?', [req.params['child_id']], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
    };
    logger.info(rows[0].pick_up_location + ' ' + rows[0].id + ' ' + rows[0].drop_off_location + ' ' + rows[0].pick_up_time + ' ' + rows[0].drop_off_time + ' ' + rows[0].parent_id + ' ' + rows[0].child_id + ' ' + rows[0].driver_id);
 
    //writing to the response object
    res.type('text/html');
    res.status(200);
    res.send('<h1>' + rows[0].id + ' ' + rows[0].pick_up_location + ' ' + rows[0].drop_off_location + ' ' + rows[0].pick_up_time + ' ' + rows[0].drop_off_time + ' ' + rows[0].parent_id + ' ' + rows[0].child_id + ' ' + rows[0].driver_id + ' ' + rows[0].parent_id + '</h1>');
  })
});

//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

// POST /changePassDriver
app.get('/changePassDriver/:driverID/:oldPass/:newPass', (req, res) => {
  connection.query('update driver_user set password = newPass where driver_user.id = driverID', function (err, rows, fields) {
    if(err){
      logger.error("error updating password");
    };
    //response
    res.type('text/html');
    res.status(200);
    res.send("fuck my shit till i die");

  });
});