
exports.setupAccounts = (req, res) => {
    let query = "drop table if exists accounts";
    db.query(query, (err, result) => {
      if(err){
        console.log(err);
        res.redirect('/');
        res.status(400);
      }
    });
    query = "CREATE TABLE `accounts` (`id` INT AUTO_INCREMENT, `username` VARCHAR(50) NOT NULL, `password` VARCHAR(50) NOT NULL, `userID` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `userID_UNIQUE` (`userID` ASC),UNIQUE INDEX `username_UNIQUE` (`username` ASC))";
    db.query(query, (err, result) => { 
        if(err) {
          console.log(err);
          logger.error("failed creating accounts table");
          res.status(400)
        }
        else {
          console.log("Accounts Table Created");
        }
      })
}

exports.login = (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    console.log("Login,","select * from accounts where username = '" + username + "' and password = '" + password + "' limit 1");
    let query = "select * from accounts where username = '" + username + "' and password = '" + password + "' limit 1";

    db.query("SELECT * FROM accounts", function(err, rows){console.log("Rows", rows);})
    db.query(query, function(err, rows, field) {
      console.log("req", req.query);
      if(rows == null  ||rows.length == 0 || err){
        logger.error("failed logging in");
        res.status(400);
      }
      else{
        res.status(200).json({
          "data": rows[0]
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