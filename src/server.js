/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/

//create main objects

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //cross origin resource sharing
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
const session = require('express-session');


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

//create a logger object.  Using logger is preferable to simply writing to the console. 
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true,
    maxAge: 60000
  }
}))
//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

/**     REQUEST HANDLERS        */

//GET /
app.get('/', (req, res) => {
  res.status(200).send('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
  //res.status(200).send('Go to localhost:3000/setupdb first. Then Go to localhost:3000/checkdb');
});


//GET /setupdb
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

//GET /checkdb
app.get('/checkdb', (req, res) => {
  //execute a query to select * from table named data. 
  connection.query('SELECT * from parent_user', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
    };
    logger.info(rows[0].name + ' ' + rows[0].id);
 
    //writing to the response object
    res.type('text/html');
    res.status(200);
    res.send('<h1>' + rows[0].id + ' ' + rows[0].name + ' ' + rows[0].password + '</h1>');
  })
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



//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});