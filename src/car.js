
//post /setupChild
exports.setupCar = (req, res) => {
  let query = "drop table if exists car";
  db.query(query, (err, result) => {
      if(err) {
          res.redirect('/');
      }
  });
  query = "create table car(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, numSeats int, numAccidents int, features varchar(50), licenceNum varchar(8), service datetime, state varchar(50), model varchar(50), driverId int REFERENCES driverUser(id))";
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
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].model + '</h1>');
  })
}

//GET /getCarseats
exports.getCarSeats = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].numSeats + '</h1>');
  })
}

//GET /getCarFeatures
exports.getCarFeatures = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].features + '</h1>');
  })
}

//GET /getcarLicence
exports.getCarLicence = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].licenceNum + '</h1>');
  })
}

//GET /getCarAccidents
exports.getCarAccidents = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].numAccidents + '</h1>');
  })
}

//GET /getCarService
exports.getCarService = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].service + '</h1>');
  })
}

//GET /getCarState
exports.getCarState = (req, res) => {
  let query = "select * from car where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting car");
      }
      res.status(200).send('<h1>' + rows[0].state + '</h1>');
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