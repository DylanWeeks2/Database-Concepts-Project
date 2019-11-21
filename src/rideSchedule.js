//var routes = require('express').Router();
//module.exports = routes;

//post createRideSchedule
exports.setupRideSchedule = (req,res) => {
  let query = "drop table if exists rideSchedule";
  db.query(query, (err,result) => {
    if(err){
      res.redirect('/');
    }
  });
  query = "create table rideSchedule(id int primary key, pick_up_location varchar(50), drop_off_location varchar(50), pick_up_time datetime(6), drop_off_time datetime(6), active tinyint(1), parent_id varchar(4) REFERENCES parent_user(id), child_id varchar(4) REFERENCES child_user(id), driver_id varchar(4) REFERENCES driver_user(id))";
  db.query(query, (err, result) => {
    if(err) {
       res.redirect('/');
       }
    res.status(200).send('created the ride schedule table'); 
  });
};

//post /addRideSchedule
exports.addRideSchedule = (req, res) => {
  let query = "insert into rideSchedule values('"+req.body.id+"','"+req.body.pick_up_location+"','"+req.body.drop_off_location+"','"+req.body.pick_up_time+"','"+req.body.drop_off_time+"','"+req.body.active+"','"+req.body.parent_id+"');";
  db.query(query, (err,result) => {
    if(err) {
      res.redirect('/');
      res.status(200).send('ride couldnt be scheduled');
    }else{
      res.status(200).send('ride scheduled');
    }
  });
};

//post /deleteRideSchedule
exports.deleteRideSchedule = (req,res) => {
  let query = "delete from rideSchedule where id = '" + req.body.id + "';";
  db.query(query, (err,result) => {
    if(err) {
      logger.error("cant delete schedule");
    }
    res.status(200).send("ride has been removed");
  });
};
  
//post /updateRideSchedule
exports.updateRideSchedule = (req,res) => {
  let query = "update schedule set pick_up_location = '" + req.body.pick_up_location + "', drop_off_location = '" + req.body.drop_off_location + "', pick_up_time = '" + req.body.pick_up_time + "', drop_off_time = '" + req.body.pick_up_time + "' where id = '" + req.body.id +"';";
  db.query(query, (err,result) => {
    if(err) {
      logger.error("cant update ride");
    }
    res.status(200).send("ride updated");
  });
};
  
//get /viewRideSchedule
exports.viewRideSchedule = (req,res) => {
  let query = "select * from schedule where child_id = '" + req.body.child_id+"';";
  db.query(query, (err,rows, fields) => {
    if(err){
      logger.error("couldn't get rides");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      });
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
}
  
  