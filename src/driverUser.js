
exports.setupDriver = (req, res) => {
  let query = "drop table if exists accidents;";
  db.query(query, (err, result) => {
    if(err){
      console.log("failed dropping accidents", err);
      res.redirect('/');
      res.status(400);
    }
    else{
  }
  });
 query = "drop table if exists availabilities;";
  db.query(query, (err, result) => {
    if(err){
      console.log("failed dropping availabilities", err);
      res.redirect('/');
      res.status(400);
    }
  });
  query = "drop table if exists services;";
  db.query(query, (err, result) => {
    if(err){
      console.log("failed dropping services", err);
      res.redirect('/');
      res.status(400);
    }
  });
  query = "drop table if exists driverUser;";
  db.query(query, (err, result) => {
    if(err){
      console.log("failed dropping driverUser", err);
      res.redirect('/');
      res.status(400);
    }
  });
  query = "CREATE TABLE `driverUser` (`id` INT AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `gender` VARCHAR(50),  `bio` VARCHAR(200), `email` VARCHAR(100),  `phone` VARCHAR(10) NOT NULL, `make` VARCHAR(50), `model` VARCHAR(50), `year` VARCHAR(50), `color` VARCHAR(50), `liscense` VARCHAR(50), `numSeats` VARCHAR(100), `condition` VARCHAR(200), `ammenities` VARCHAR(500),`username` VARCHAR(100) NOT NULL, `password` VARCHAR(500) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC)); ";
  db.query(query, (err, result) => {

    if(err) {
      console.log("error creaing driver user table", err);
      logger.error("failed creating driver user table");
      console.log(err);
      res.status(400)
    }
    else{
      console.log("Driver Table Created");
    }
  })
  query = "alter table driverUser auto_increment = 300000;";
  db.query(query, (err, result) => {
    if(err) { 
      console.log(err);
      res.status(400);}
  })
};

// post /addDriver
exports.addDriver = (req, res) => {
  let query = "insert into driverUser values(NULL,'"+ `${req.body.name}', '${req.body.gender}` + "',NULL"  + `,'${req.body.email}','` + req.body.phone + `', NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL,'${req.body.username}','` + req.body.password + "');";
  db.query(query, (err, result) => {
    if(err) {
      console.log(err);
      logger.error("failed adding a driver user");
      res.status(400);
    }
  });
  var currID;
  let user = null;
  db.query("SELECT * FROM driverUser;", (err, rows) => console.log("all rows", rows));
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
  db.query("SELECT * FROM driverUser", (err, rows) => console.log("all rows", rows));
  let query = "select * from driverUser d LEFT JOIN services s ON d.id = s.driverId where d.id = " + req.params.id + ";";

  console.log(query);
  //db.query("SELECT * FROM SERVICES", function(err, rows, fields) {console.log("services", rows)});
  db.query(query, function(err,rows, fields) {
      if(err){
          logger.error("couldn't get driver user", err);
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

exports.updateDriver = (req, res) => {
  let query = `UPDATE  driverUser SET \`condition\` = '${req.body.condition}', name = '${req.body.name}', gender = '${req.body.gender}', bio = '${req.body.bio}', email = '${req.body.email}', phone = '${req.body.phone}', make = '${req.body.make}', model = '${req.body.model}', year = '${req.body.year}', color = '${req.body.color}', liscense = '${req.body.liscense}', numSeats = '${req.body.numSeats || ""}', ammenities = '${req.body.ammenities}' WHERE id = ${req.body.id};`;
  //let query = `UPDATE driverUser SET name = '', gender ='male' where id = 1`;
  console.log(query);
  db.query(query, function(err,rows, fields) {
    if(err){
      console.log("Cant find user", err);
        logger.error("couldn't get driver user ", err);
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
  let query = "select * from driverUser where name = '" + req.body.username + "' and password = '" + req.body.password + "' limit 1;";
  db.query(query, function(err, rows, field) {
    if(rows == null  ||rows.length == 0){
      res.status(200).json({
        "data": []
      });
    }
    else if(err) {
      logger.error("failed logging in driver");
      res.status(400);
    }
    else{
      res.status(200).json({
        "data": rows
      })
    }
  })
}