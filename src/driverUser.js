
exports.setupDriver = (req, res) => {
  let query = "drop table if exists driverUser";
  db.query(query, (err, result) => {
    if(err){
      res.redirect('/');
      res.status(400);
    }
  });
  query = "CREATE TABLE `driverUser` (`id` INT AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `gender` VARCHAR(50),  `bio` VARCHAR(200), `email` VARCHAR(100),  `phone` VARCHAR(10) NOT NULL, `make` VARCHAR(50), `model` VARCHAR(50), `year` VARCHAR(50), `color` VARCHAR(50), `liscense` VARCHAR(50), `numSeats` VARCHAR(10), `condition` VARCHAR(200), `ammenities` VARCHAR(500),`username` VARCHAR(100) NOT NULL, `password` VARCHAR(100) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC)); ";
  db.query(query, (err, result) => {
    if(err) {
      logger.error("failed creating driver user table");
      res.status(400)
    }
  })
  query = "alter table parentUser auto_increment = 300000";
  db.query(query, (err, result) => {
    if(err) { 
      console.log(err);
      res.status(400);}
  })
};

// post /addDriver
exports.addDriver = (req, res) => {
  let query = "insert into driverUser values(NULL,'"+ `${req.body.name}', '${req.body.gender}` + "',NULL"  + `,'${req.body.email}','` + req.body.phone + `', NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL,'${req.body.username}','` + req.body.password + "')";
  db.query(query, (err, result) => {
    if(err) {
      console.log(err);
      logger.error("failed adding a driver user");
      res.status(400);
    }
  });
  var currID;
  let user = null;
  db.query("SELECT * FROM driverUser", (err, rows) => console.log("all rows", rows));
  query = "select * from driverUser where name = '" + req.body.name + "' limit 1;"
  db.query(query, (err,rows,fields) => {
    if(err){
      console.log(err);
      console.log("couldnt find the user we just added");
      res.status(400);
    }
    else {
      console.log("rows", rows);
      console.log(rows[0].id);
      console.log("Found User");
      user = rows[0];
      currID = rows[0].id;
      console.log("insert into accounts values (NULL,'" + req.body.username +"','" + req.body.password +"'," + currID +");");
      query = "insert into accounts values (NULL,'" + req.body.username +"','" + req.body.password +"'," + currID +");";
      db.query(query, (err,rows, result) => {
        if(err){
          console.log(err);
          console.log("couldnt add new account into the accounts table");
          res.status(400);
        }
        else{
          res.status(200).json({
            "user": user
          });
        }
      });
    }
  });
  // query = "insert into accounts values (NULL,'" + req.body.username +"','" + req.body.password +"','" + currID +"');";
  // db.query(query, (err,result) => {
  //   if(err){
  //     logger.error("couldnt add new account into the accounts table");
  //     res.status(400);
  //   }
  //   else{
  //     console.log("result,", result);
  //     res.status(200).json({
  //       "user": result
  //     });
  //   }
  // });
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