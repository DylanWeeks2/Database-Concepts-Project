var routes = require('express').Router();
module.exports = routes;

// GET /setupDriver
routes.get('/setupDriver', (req, res) => {
   //set up the driver table
   connection.query('drop table if exists driver_user', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('create table driver_user(id int, name varchar(50), bio varchar(200), cellPhone varchar(10), fingerprint tinyint(1), reported tinyint(1), password varchar(50))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table driver_user");
  });
  res.status(200).send("set up the driver");
});

// post /addDriver
routes.get('/addDriver/:id/:name/:bio/:cellPhone/:fingerprint/:reported/:password', (req, res) => {
  connection.query('insert into driver_user values(?, ?, ?, ?, ?, ?, ?)',[req.params['id'],req.params['name'], req.params['bio'], req.params['cellPhone'],req.params['fingerprint'],req.params['reported'],req.params['password']], function(err,rows,fields){
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send('added given driver');
});

//post /updateDriverPassword
routes.post('/updateDriverPassword/:id/:pass', (req, res) => {
    connection.query('update driver_user set password = ? where id = ?', [req.params['new_password'],req.params['id']], function (err, rows, fields){
      if(err)
        logger.error('updating password failed');
    });
    res.status(200).send('updated driver password');
});