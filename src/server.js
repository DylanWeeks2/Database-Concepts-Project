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

var sesh;

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
var i = 0;

app.set('trust proxy', 1);
app.use(session({
  secret: 'DB project',
  resave: false,
  saveUnitialized: true,
}));

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

//////////////////////////////////////////////////////////
//login
/////////////////////////////////////////////////////////

app.get('/login', (req,res)=>{
  sesh = req.session;
  res.status(200).send('You are now logged in an can access database');
});

var auth = function(req,res,next)
{
  if(sesh)
  {
    return next();
  }
  else{
    return res.sendStatus(401);
  }
};

////////////////////////////////////////////////////////////
//HTML
/////////////////////////////////////////////////////////////

const form = "<form method=\"post\" action=\"http://localhost:3000/addChild\">"
  +"Child Name:<br>"
  +"  <input type=\"text\" name=\"child_name\" value=\"\">"
  +"  <br>"
  +"  Parent Name:<br>"
  +"  <input type=\"text\" name=\"parent_name\" value=\"\">"
  +"  <br>"
  +"  Bio:<br>"
  +"  <input type=\"text\" name=\"bio\" value=\"\">"
  +"  <br><br>"
  +"  <input type=\"submit\" value=\"Submit\">"
  +"</form>";

  const form2 = "<form method=\"post\" action=\"http://localhost:3000/updateChild\">"
  +"Update Child Name:<br>"
  +"  <input type=\"text\" name=\"child_name\" value=\"\">"
  +"  <br>"
  +"  Update Parent Name:<br>"
  +"  <input type=\"text\" name=\"parent_name\" value=\"\">"
  +"  <br>"
  +"  Update Bio:<br>"
  +"  <input type=\"text\" name=\"bio\" value=\"\">"
  +"  <br><br>"
  +"  <input type=\"submit\" value=\"Submit\">"
  +"</form>";

////////////////////////////////////////////////////////////
//CREATE CHILD
////////////////////////////////////////////////////////////

app.get("/createChild", auth, function (req, res) {
  connection.query('drop table if exists child_info', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
    });
  connection.query('create table child_info(id int, parent_id int, name varchar(50), parent_name varchar(50), bio varchar(255), rating decimal(19,4), PRIMARY KEY(id))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table child_info");
  });
  res.status(200).send("Table for child has been created, please go to localhost:3000/addChild to add a new child!");
});

//////////////////////////////////////////////////////////
//ADD CHILD
//////////////////////////////////////////////////////////

app.get("/addChild/:id/:parent_id/:name/:parent_name/:bio/:rating", function (req, res) {
  connection.query('insert into child_info values(?, ?, ?, ?, ?, ?)', [req.params['id'],req.params['parent_id'], req.params['name'],req.params['parent_name'],req.params['bio'],req.params['rating']], function(err, rows, fields) {
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send("Child user has been added!");
});

////////////////////////////////////////////////////////////
//UPDATE CHILD
////////////////////////////////////////////////////////////

app.get("/updateChild/:id/:parent_id/:name/:parent_name/:bio/:rating", function (req, res) {
  res.status(200).send("Child has been updated!!");
});
app.post("/updateChild", function (req, res) {
  connection.query('update child_info set parent_name = ? , bio= ? WHERE name = ?;', [req.params['parent_name'],req.params['bio'],req.params['child_name']], function(err, rows, fields) {
    if(err)
      logger.error('cant update child');
  });
});

//////////////////////////////////////////////////////////////
//CREATE SCHEDUELE
//////////////////////////////////////////////////////////////

app.get("/createSchedule", auth, function (req, res) {
  connection.query('DROP table if exists child_info', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
    });
  connection.query('CREATE table schedule(id int, parent_id int, child_id int, number_of_rides int, PRIMARY KEY(id))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table child_info");
  });
  res.status(200).send('The Schedule has been created!!');
});

app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});