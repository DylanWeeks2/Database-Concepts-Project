var routes = require('express').Router();
module.exports = routes;
//get /createRideSchedule
routes.get("/setupSchedule", function (req, res) {
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
  
  //get /addRideSchedule
  routes.get("/addSchedule/:id/:pick_up_location/:drop_off_location/:pick_up_time/:drop_off_time/:parent_id/:child_id/:driver_id", function (req, res) {
    connection.query('insert into schedule values(?, ?, ?, ?, ?, ?, ?, ?)', [req.params['id'], req.params['pick_up_location'],req.params['drop_off_location'],req.params['pick_up_time'],req.params['drop_off_time'], req.params['parent_id'], req.params['child_id'], req.params['driver_id']], function(err, rows, fields) {
      if(err)
        logger.error('adding row to table failed');
    });
    res.status(200).send("A Schedule has been added!");
  });
  
  //post /deleteRideSchedule
  routes.get("/deleteSchedule/:id", function (req, res) {
    connection.query('DELETE FROM schedule WHERE id = ?;', [req.params['id']], function(err, rows, fields) {
      if(err)
        logger.error('cant DELETE Schedule!');
    res.status(200).send("Ride has been removed!!");
    });
  });
  
  //post /updateRideSchedule
  routes.get("/updateSchedule/:id/:pick_up_location/:drop_off_location/:pick_up_time/:drop_off_time", function (req, res) {
    connection.query('update schedule set pick_up_location = ?, drop_off_location = ?, pick_up_time = ?, drop_off_time = ? WHERE id = ?;', [req.params['pick_up_location'], req.params['drop_off_location'], req.params['pick_up_time'], req.params['drop_off_time'],  req.params['id']], function(err, rows, fields) {
      if(err)
        logger.error('cant update child');
        res.status(200).send("Schedule UPDATED!!");
    });
  });
  
  //get /viewRideSchedule
  routes.get('/viewSchedule/:child_id', (req, res) => {
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
  