
exports.setupDriver = (req, res) => {
  let query = "drop table if exists driverUser";
  db.query(query, (err, result) => {
    if(err){
      res.redirect('/');
      res.status(400);
    }
  });
  query = "CREATE TABLE driverUser` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `bio` VARCHAR(200) NOT NULL, `cellPhone` VARCHAR(10) NOT NULL, `fingerprint` TINYINT(1) NOT NULL, `reported` TINYINT(1) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC)); ";
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
  });
  var currID;
  query = "select * from driverUser where name = '" + req.body.name + "' limit one;"
  db.query(query, (err,rows,fields) => {
    if(err){
      logger.error("couldnt find the user we just added");
      res.status(400);
    }
    else{
      currID = rows[0].id;
      res.status(200).send('got the userID back');
    }
  });
  query = "insert into accounts values (NULL,'" + req.body.username +"','" + req.body.password +"','" + currID +"');";
  db.query(query, (err,result) => {
    if(err){
      logger.error("couldnt add new account into the accounts table");
      res.status(400);
    }else{
      res.status(200).send("completed adding new user to accounts table");
    }
  });
}

//post /updateDriverPassword
//exports.changeDriverPassword = (req, res) => {
  //let query = "update driverUser set password ='" + req.body.password + "'where id = '" + req.body.id + "'";
  //db.query(query, (err, result) => {
    //if(err) {
      //logger.error("failed updatingdriver password");
      //res.status(400);
    //}
    //else{
      //res.status(200).send('updated the driver user password');
    //}
  //})
//}

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

exports.login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = "select * from parentUser where name = '" + req.body.username + "' and password = '" + req.body.password + "' limit 1";
  db.query(query, function(err, rows, field) {
    if(rows == null  ||rows.length == 0){
      res.status(200).json({
        "data": []
      });
    }
    else if(err) {
      logger.error("failed logging in parent");
      res.status(400);
    }
    else{
      res.status(200).json({
        "data": rows
      })
    }
  })
}