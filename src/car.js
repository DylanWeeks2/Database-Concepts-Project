var routes = require('express').Router();
module.exports = routes;

routes.get('/setupCar', (req, res) => {
    // set up car information
    connection.query('drop table if exists car', function (err, rows, fields) {
      if(err)
        logger.error("Can't drop table");
    });
    connection.query('create table car(id varchar(4), numSeats int, numAccidents int, features varchar(50), licenceNum varchar(8), service datetime(6), state varchar(50), model varchar(50), driverID varchar(4) REFERENCES driver_user(id))' , function(err,rows,fields){
      //dconstraint driverID foreign key(driver_ID) references driver_user.id',
      if(err)
        logger.error("Can't add car");
    });
   res.status(200).send("set up the car");
  });

  //GET /getCarModel
routes.get('/getCarModel/:carID', (req, res) => {
  connection.query('select model from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car model');
    res.status(200).send('<h1>' + rows[0].model + '</h1>');
  })
});
//GET /getCarSeats
routes.get('/getCarSeats/:carID', (req, res) => {
  connection.query('select numSeats from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car seats');
    res.status(200).send('<h1>' + rows[0].numSeats + '</h1>');
  });
});
//GET /getCarFeatures
routes.get('/getCarFeatures/:carID', (req, res) => {
  connection.query('select features from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car features');
    res.status(200).send('<h1>' + rows[0].features + '</h1>');
  });
});

//GET /getCarLicence
routes.get('/getCarLicence/:carID', (req, res) => {
  connection.query('select licenceNum from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car licence');
    res.status(200).send('<h1>' + rows[0].licenceNum + '</h1>');
  });
});
//GET /getCarAccidents
routes.get('/getCarAccidents/:carID', (req, res) => {
  connection.query('select numAccidents from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car accidents');
    res.status(200).send('<h1>' + rows[0].numAccidents + '</h1>');
  });
});

//GET /getCarService
routes.get('/getCarService/:carID', (req, res) => {
  connection.query('select service from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car service');
    res.status(200).send('<h1>' + rows[0].service + '</h1>');
  });
});

//GET /getCarState
routes.get('/getCarState/:carID', (req, res) => {
  connection.query('select state from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car state');
    res.status(200).send('<h1>' + rows[0].state + '</h1>');
  });
});
//GET /getCarDriverId
routes.get('/getCarDriverId/:carID', (req, res) => {
  connection.query('select driverId from car where id = ?', [req.params['carID']], function(err, rows, fields){
    if(err)
      logger.error('failed getting car driver id');
    res.status(200).send('<h1>' + rows[0].driverID + '</h1>');
  });
});

//post /addCar
routes.get('/addCar/:carID/:numSeats/:numAccidents/:features/:licenceNum/:service/:state/:model/:driverID', (req, res) => {
  connection.query('insert into car values(?,?,?,?,?,?,?,?,?)', [req.params['carID'], req.params['numSeats'], req.params['numAccidents'], req.params['features'], req.params['licenceNum'], req.params['service'] ,req.params['state'] ,req.params['model'] ,req.params['driverID']], function(err,rows,fields){
    if(err)
      logger.error('adding row to table failed');
    logger.info(req.params['features']);
    res.status(200).send('added given car');
  });
});

//post /updateCarService
routes.get('/updateCarService/:carID/:newService', (req, res) => {
  connection.query('update car set service = ? where id = ?', [req.params['newService'],req.params['carID']], function (err, rows, fields){
    if(err)
      logger.error('updating car service failed');
  });
  res.status(200).send('updated car service');
});

//post /updateCarAccidents
routes.get('/updateCarAccidents/:carID', (req, res) => {
  connection.query('update car set numAccidents = numAccidents + 1 where id = ?', [req.params['carID']], function (err, rows, fields){
    if(err)
      logger.error('updating car accidents failed');
  });
  res.status(200).send('updated car accidents');
});
