var routes = require('express').Router();
module.exports = routes;

routes.get('/setupDriver_Schedule', (req,res) => {
    connection.query('drop table if exists driver_schedule', function (err, rows, fields) {
      if (err)
        logger.error("Can't drop table");
    });
    connection.query('create table driver_schedule(id varchar(4), start datetime(6), end datetime(6), active tinyint(1), driver_id varchar(4) REFERENCES driver_user(id))', function (err, rows, fields) {
      if (err)
        logger.error("Problem creating the table driver_schedule")
    });
  
  res.status(200).send('created the driver schedule table');
  });
  
  
  // post /addDriver_schedule
  routes.get('/addDriver_Schedule/:id/:start/:end/:active/:driver', (req, res) => {
    connection.query('insert into driver_schedule values(?, ?, ?, ?, ?)',[req.params['id'],req.params['start'], req.params['end'], req.params['active'], req.params['driver']], function(err,rows,fields){
      if(err)
        logger.error('adding row to table failed');
    });
    res.status(200).send('added given free time to driver');
  });

 
  routes.get('/setDriverScheduleInactive', (req,res) => {
    connection.query('update driver_schedule set active = ? where id = ?',[req.body['status'],req.body['id']], function(err,rows,fields){
      if(err)
        logger.error('updating schedule failed')
    });

  });

  routes.get('/getAvailableDrivers', (req,res) => {
    connection.query('select * from driver_schedule where ? > driver_schedule.start and ? < driver_schedule.end', [ req.body['time'], req.body['time']], function(err,rows,fields){
      if (err) {
        logger.error("Error while executing Query");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        })
      }
      else{
        res.status(200).json({
          "data": rows
        });
      }
    });
  });