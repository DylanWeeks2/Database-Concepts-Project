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
  query = "CREATE TABLE `rideSchedule` ( `id` INT NOT NULL AUTO_INCREMENT, `pick_up_location` VARCHAR(45) NOT NULL, `drop_off_location` VARCHAR(45) NOT NULL, `pick_up_time` DATETIME(6) NOT NULL, `drop_off_time` DATETIME(6) NOT NULL, `active` TINYINT(1) NOT NULL, `parent` INT NOT NULL, `child` INT NOT NULL, `driver` INT NOT NULL, PRIMARY KEY (`id`), INDEX `driverID_idx` (`driver` ASC), INDEX `parentID_idx` (`parent` ASC), INDEX `childID_idx` (`child` ASC), UNIQUE INDEX `id_UNIQUE` (`id` ASC), CONSTRAINT `driver_ID`  FOREIGN KEY (`driver`) REFERENCES `db`.`driverUser` (`id`) ON DELETE NO ACTION  ON UPDATE NO ACTION, CONSTRAINT `parent_ID` FOREIGN KEY (`parent`) REFERENCES `db`.`parentUser` (`id`) ON DELETE NO ACTION  ON UPDATE NO ACTION, CONSTRAINT `child_ID`  FOREIGN KEY (`child`) REFERENCES `db`.`childUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
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
  
  