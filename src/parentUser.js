//post /setup_parent
exports.setupParent = (req, res) => {
  let query = "DROP TABLE if exists parentUser";
  console.log("trying to create parent");
  db.query(query, (err, result) => 
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });
  console.log("CREATE TABLE `parentUser` (`id` INT AUTO_INCREMENT,`email` VARCHAR(100), `phone` VARCHAR(100), `homeAddr` VARCHAR(200), `workAddr` VARCHAR(100),  `name` VARCHAR(50), `password` VARCHAR(500), `username` VARCHAR(100), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC));");
  query = "CREATE TABLE `parentUser` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(100), `phone` VARCHAR(100), `homeAddr` VARCHAR(200), `workAddr` VARCHAR(100),  `name` VARCHAR(50), `password` VARCHAR(500), `username` VARCHAR(100), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC)); ";
  db.query(query, (err, result) => {
    if(err) { 
      console.log("Errpr creaing parent user", err);
      res.redirect('/'); }
  })
  query = "ALTER TABLE parentUser AUTO_INCREMENT = 100000";
  db.query(query, (err, result) => {
    if(err) { 
      console.log("Error altering parentuser", err);
      res.status(400);}
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
  console.log("insert into parentUser (id, email, phone, homeAddr, workAddr, name, password, username) values(" + ` NULL, '${req.body.email}', '${req.body.phone}', '${req.body.homeAddr}', '${req.body.workAddr}', '${req.body.name}', '${req.body.password}', '${req.body.username}'`+ ")");
  let query = "insert into parentUser (id, email, phone, homeAddr, workAddr, name, password, username) values(" + ` NULL, '${req.body.email}', '${req.body.phone}', '${req.body.homeAddr}', '${req.body.workAddr}', '${req.body.name}', '${req.body.password}', '${req.body.username}'`+ ")";
  console.log(req.body);
  db.query(query, (err, result) => {
    if(err) {
      console.log(err);
      logger.error("failed adding a parent");
      res.status(400);
    }
  })
  let currID = 0;
  let user = null;
  db.query("select * from parentUser", (err,rows,fields) => {console.log("rows:", rows);});
  query = "select * from parentUser where name = '" + req.body.name + "' limit 1;"
  db.query(query, (err,rows,fields) => {
    if(err){
      console.log(err);
      console.log("couldnt find the user we just added");
      res.status(400);
    }
    else {
      console.log(req.body.name);
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
}

exports.getParent = (req, res) => {
  let query = "select * from parentUser where id = '" + req.query.id + "';";
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

exports.getParentAndChildInfo = (req, res) => {
  let query = "SELECT * FROM parentUser as p LEFT JOIN childUser as c ON p.id = c.parentID WHERE p.id = '" + req.body.id + "';";
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