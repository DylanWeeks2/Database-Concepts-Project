//post /setup_parent
exports.setupParent = (req, res) => {
  let query = "drop table if exists parentUser";
  db.query(query, (err, result) => {
    if(err) { res.redirect('/'); }
  });
  query = "CREATE TABLE 'parentUser` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC));";
  db.query(query, (err, result) => {
    if(err) { res.redirect('/'); }
    res.status(200).send('created the parent table');
  })
  query = "alter table parentUser auto_increment = 100000";
  db.query(query, (err, result) => {
    if(err) { res.status(400);}
  })
}

//POST /change_password
exports.changeParentPassword = (req, res) => {
  let query = "update parentUser set password ='" + req.body.password + "'where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
    if(err) {
      logger.error("failed updating password");
      res.status(400);
    }
    else{
      res.status(200).send('updated the parent user password');
    }
  })
}

exports.addParent = (req,res) => {
  let query = "insert into parentUser values(NULL,'" + req.body.name + "')";
  console.log(req.body);
  db.query(query, (err, result) => {
    if(err) {
      logger.error("failed adding a parent");
      res.status(400);
    }
    else{
      res.status(200).send('added the parent User');
    }
  })
  var currID;
  query = "select * from parentUser where name = '" + req.body.name + "' limit one;"
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

exports.getParent = (req, res) => {
  let query = "select * from parentUser where id = '" + req.body.id + "';";
  db.query(query, function(err, rows, fields) {
    if(err){
      logger.error("couldn't get parent user");
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