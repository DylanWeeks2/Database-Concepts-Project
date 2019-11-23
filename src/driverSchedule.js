//var routes = require('express').Router();
//module.exports = routes;

// post setup driver schedule
exports.setupDriverSchedule = (req, res) => {
  let query = "drop table if exists driverSchedule";
  db.query(query, (err,result) => {
    if(err){
      res.redirect('/');
    }
  });
  query = "CREATE TABLE `driverSchedule` (`id` INT NOT NULL AUTO_INCREMENT,`start` DATETIME(6) NULL,`end` DATETIME(6) NULL,`active` TINYINT(1) NULL,`driverID` INT NULL,PRIMARY KEY (`id`),INDEX `driver_idx` (`driverID` ASC),  CONSTRAINT `driver` FOREIGN KEY (`driverID`) REFERENCES `db`.`driverUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
  db.query(query, (err, result) => {
    if(err) {
       res.redirect('/');
       }
    res.status(200).send('created the driver schedule table');
});
};

// post addDriverSchedule
exports.addDriverSchedule = (req, res) => {
  console.log(req.body);
  let query = "insert into driverSchedule values('" + req.body.id + "','" + req.body.start + "','" + req.body.end + "','" + req.body.active + "','" + req.body.parent_id + "')"; 
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed saving new credit card");
          res.status(400);
      }
      else{
          res.status(200).send('added the credit card');
      }
  });
};
  
//post setDriverScheduleStatus
exports.setDriverScheduleStatus = (req, res) => {
  console.log(req,body);
  let query = "update driverSchedule set active = '" + req.body.status + "' where id = '" +req.body.id+ "';";
  db.query(query, (err,result) => {
    if(err){
      logger.error("updating schedule failed");
    }
  });
};


 //get getAvailableDrivers
 exports.getAvailableDrivers = (req, res) =>{
  console.log(req,body);
  let query = "select * from driverSchedule where '"+req.body.time+"' > driverSchedule.start and '"+req.body.time+ "'< driverSchedule.end";
  db.query(query, (err,rows, fields) => {
    if(err){
      logger.error("couldn't get drivers");
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
 };
