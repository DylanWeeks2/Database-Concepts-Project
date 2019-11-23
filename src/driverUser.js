
exports.setupDriver = (req, res) => {
  let query = "drop table if exists driverUser";
  db.query(query, (err, result) => {
    if(err){
      res.redirect('/');
      res.status(400);
    }
  });
  query = "create table driverUser(id int not null auto_increment primary key, name varchar(50), bio varchar(200), cellPhone varchar(10), fingerprint tinyint(1), reported tinyint(1), password varchar(50))";
  db.query(query, (err, result) => {
    if(err) {
      logger.error("failed creating driver user table");
      res.status(400)
    }
    else {
      res.status(200).send('added the driver user');
    }
  })
};

// post /addDriver
exports.addDriver = (req, res) => {
  let query = "insert into driverUser values(NULL,'"+ req.body.name + "','" + req.body.bio + "','" + req.body.cellPhone + "','" + req.body.fingerprint + "','" + req.body.reported + "','" + req.body.password + "')";
  db.query(query, (err, result) => {
    if(err) {
      logger.error("failed adding a driver user");
      res.status(400);
    }
    else{
      res.status(200).send("added the driver user");
    }

  })
}

//post /updateDriverPassword
exports.changeDriverPassword = (req, res) => {
  let query = "update driverUser set password ='" + req.body.password + "'where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
    if(err) {
      logger.error("failed updatingdriver password");
      res.status(400);
    }
    else{
      res.status(200).send('updated the driver user password');
    }
  })
}

//GET /getDriver
exports.getDriver = (req, res) => {
  let query = "select * from driverUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err){
          logger.error("couldn't get driver user");
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
  })
}