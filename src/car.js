
//post /setupChild
exports.setupCar = (req, res) => {
  let query = "drop table if exists Car";
  db.query(query, (err, result) => {
      if(err) {
          res.redirect('/');
      }
  });
  query = "CREATE TABLE `Car` (`id` INT NOT NULL AUTO_INCREMENT,`numSeats` INT , `numAccidents` INT , `features` VARCHAR(50) , `licenseNum` VARCHAR(8) , `service` DATETIME , `state` VARCHAR(50) , `model` VARCHAR(50) , `driverID` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `driverID_idx` (`driverID` ASC), CONSTRAINT `driverID` FOREIGN KEY (`driverID`) REFERENCES `db`.`driverUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
  db.query(query, (err, result) => {
      if(err) { res.redirect('/'); }
      else{
        res.status(200).send('Car Table has been created.');
      }
  })
}; 

//post /addCar
exports.addCar = (req, res) => {
  console.log(req.body);
  let query = "INSERT into Car values(NULL,'" + req.body.numSeats + "','" + req.body.numAccidents + "','" + req.body.features + "','" + req.body.licenseNum + "','" + req.body.service + "','" + req.body.state + "','" + req.body.model + "','" + req.body.driverID + "')"; 
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too add car");
          res.status(400);
      }
      else{
          res.status(200).send('Child has been added!!');
      }
  })
};

//GET /getCar
exports.getCar = (req, res) => {
  let query = "select * from Car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get car info");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "Data": rows
        });
      }  
    })
}

//post /updateChild
exports.updateCar = (req, res) => {
  console.log(req.body);
  let query = "update Car set numSeats = '" + req.body.numSeats + "', numAccidents = '" + req.body.numAccidents + "', features = '" + req.body.features + "', licenseNum = '" + req.body.licenseNum + "', state = '" + req.body.state + "', model = '" + req.body.model + "', service = '" + req.body.service + "' where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too update car");
          res.status(400);
      }
      else{
          res.status(200).send('car has been updated!!');
      }
  })
};