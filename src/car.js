
//post /setupChild
exports.setupCar = (req, res) => {
  let query = "drop table if exists car";
  db.query(query, (err, result) => {
      if(err) {
          res.redirect('/');
      }
  });
  query = "CREATE TABLE `db`.`Car` (`id` INT NOT NULL AUTO_INCREMENT,`numSeats` INT NOT NULL, `numAccidents` INT NOT NULL, `features` VARCHAR(50) NOT NULL, `licenseNum` VARCHAR(8) NOT NULL, `service` DATETIME NOT NULL, `state` VARCHAR(50) NOT NULL, `model` VARCHAR(50) NOT NULL, `driverID` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `driverID_idx` (`driverID` ASC), CONSTRAINT `driverID` FOREIGN KEY (`driverID`) REFERENCES `db`.`driverUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
  db.query(query, (err, result) => {
      if(err) { res.redirect('/'); }
      else{
        res.status(200).send('Car Table has been created.');
      }
  })
}; 

//post /addChild
exports.addCar = (req, res) => {
  console.log(req.body);
  let query = "INSERT into car values(NULL,'" + req.body.numSeats + "','" + req.body.numAccidents + "','" + req.body.features + "','" + req.body.licenceNum + "', now(),'" + req.body.state + "','" + req.body.model + "','" + req.body.driverId + "')"; 
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

//GET /getCarModel
exports.getCarModel = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get car model");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "model": rows[0].model
        });
      }  
    })
}

//GET /getCarseats
exports.getCarSeats = (req, res) => {
    db.query(query, function(err,rows, fields) {
        if(err){
            logger.error("couldn't get number of seats");
            res.status(400).json({
              "data": [],
              "error": "MySQL error"
            });
          }
          else{
            res.status(200).json({
              "numSeats": rows[0].numSeats
            });
          }  
        })
}

//GET /getCarFeatures
exports.getCarFeatures = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get car features");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "features": rows[0].features
        });
      }  
    })
}

//GET /getcarLicence
exports.getCarLicence = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get licence plate number");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "licenceNum": rows[0].licenceNum
        });
      }  
    })
}

//GET /getCarAccidents
exports.getCarAccidents = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get number of accidents");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "numAccidents": rows[0].numAccidents
        });
      }  
    })
}

//GET /getCarService
exports.getCarService = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get service");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "service": rows[0].service
        });
      }  
    })
}

//GET /getCarState
exports.getCarState = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get state");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "state": rows[0].state
        });
      }  
    })
}

//post /updateChild
exports.updateCarService = (req, res) => {
  console.log(req.body);
  let query = "update car set service = '" + req.body.service + "' where id = '" + req.body.id + "'";
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

//post /updateChild
exports.updateCarAccidents = (req, res) => {
  console.log(req.body);
  let query = "update car set numAccidents = '" + req.body.numAccidents + "' where id = '" + req.body.id + "'";
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