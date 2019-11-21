//post /setup_parent
exports.setupParent = (req, res) => {
  let query = "drop table if exists parentUser";
  db.query(query, (err, result) => {
    if(err) { res.redirect('/'); }
  });
  query = "create table parentUser(id int not null auto_increment primary key, name varchar(50), password varchar(50))";
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
  let query = "insert into parentUser values(NULL,'" + req.body.name + "','" + req.body.password + "')";
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
}

exports.getParent = (req, res) => {
  let query = "select * from parentUser where id = '" + req.body.id + "'";
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