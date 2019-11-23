
exports.setupAccounts = (req, res) => {
    let query = "drop table if exists accounts";
    db.query(query, (err, result) => {
      if(err){
        res.redirect('/');
        res.status(400);
      }
    });
    query = "CREATE TABLE accounts` (`id` INT NOT NULL AUTO_INCREMENT, `username` VARCHAR(50) NOT NULL, `password` VARCHAR(50) NOT NULL, `userID` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `userID_UNIQUE` (`userID` ASC),UNIQUE INDEX `username_UNIQUE` (`username` ASC))";
    db.query(query, (err, result) => { 
        if(err) {
          logger.error("failed creating accounts table");
          res.status(400)
        }
        else {
          res.status(200).send('added the accounts table');
        }
      })
}

exports.login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = "select * from accounts where username = '" + req.body.username + "' and password = '" + req.body.password + "' limit 1";
    db.query(query, function(err, rows, field) {
      if(rows == null  ||rows.length == 0){
        res.status(200).json({
          "data": []
        });
      }
      else if(err) {
        logger.error("failed logging in");
        res.status(400);
      }
      else{
        res.status(200).json({
          "data": rows
        })
      }
    })
  }

  exports.changePassword = (req, res) => {
//userID, oldPass, newPass, username
    let query = "update accounts set password = '" + req.body.newPassword + "' where userID = '" + req.body.userID + "' AND username = '" + req.body.username + "';"
    db.query(query, (err,result) => {
      if(err){
        logger.error("couldnt change password");
        res.status(400);
      }else{
        res.status(200).send("successful change of password");
      }
    });
  }