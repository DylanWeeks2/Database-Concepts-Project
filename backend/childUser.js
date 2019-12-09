//var routes = require('express').Router();
//module.exports = routes;

//post /setupChild
exports.setupChild = (req, res) => {
  let query = "drop table if exists childUser";
  db.query(query, (err, result) => {
      if(err) {
          res.status(200);
      }
  });
  query = "CREATE TABLE `childUser` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `username` VARCHAR(50) NOT NULL, `password` VARCHAR(500) NOT NULL, `grade` INT,`school` VARCHAR(200), `bio` VARCHAR(200), `healthConditions` VARCHAR(200), `emergencyContactName` VARCHAR(50), `emergencyContactNumber` VARCHAR(50), `rating` DECIMAL(19,4), `parentID` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `parentID_idx` (`parentID` ASC), CONSTRAINT `parentID` FOREIGN KEY (`parentID`) REFERENCES `db`.`parentUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION); ";
  db.query(query, (err, result) => {
      if(err) {
        console.log(err);
      }
      else{
        console.log("Child Table Created");
      }
  })

  query = "ALTER TABLE `childUser` AUTO_INCREMENT = 200000;"
  db.query(query, (err, result) => {
      if(err) {}
      else{
      }
  })
};

//post /addChild
exports.addChild = (req, res) => {
  console.log(req.body);
  let query = "INSERT into childUser values(NULL,'" + req.body.name + "','" + req.body.username + "','" + req.body.password + "','"  + req.body.grade + "','"+ req.body.school +"', NULL,'" + req.body.healthConditions + "', NULL , NULL , NULL ,'" + req.body.parentID + "');"; 
  db.query(query, (err, result) => {
      if(err) {
          console.log(err);
          logger.error("failed too add child");
          res.status(400);
      }
      else{
      }
  });
  var currID;
  query = "select * from childUser where name = '" + req.body.name + "' limit 1;"
  db.query(query, (err,rows,fields) => {
    if(err){
      logger.error("couldnt find the user we just added");
      res.status(400);
    }
    else{
      console.log(rows);
      currID = rows[0].id;
      console.log(currID);
  query = "insert into accounts values (NULL,'" + req.body.username +"','" + req.body.password +"','" + currID +"');";
  db.query(query, (err,result) => {
    if(err){
      logger.error("couldnt add new account into the accounts table");
      console.log(err);
      res.status(400);
    }else{
    }
  });
  res.status(200).json({
    "id": currID
  });
    }
  });
  
};

//GET /getChild
exports.getChild = (req, res) => {
  let query = "select * from childUser where id = '" + req.query.id + "';";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get child info");
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
//GET /getChildOfParent
exports.getChildOfParent = (req, res) => {
  let query = "select * from childUser where parentID = '" + req.query.parent + "';";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get child info");
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

//post /updateChild
exports.updateChild = (req, res) => {
  console.log(req.body);
  let query = "update childUser set name = '" + req.body.name + "', bio = '" + req.body.bio + "', username = '" + req.body.username + "', password = '" + req.body.password + "', grade = '" + req.body.grade + "', healthConditions = '" + req.body.healthConditions + "', emergencyContactName = '" + req.body.emergencyContactName + "', emergencyContactNumber = '" + req.body.emergencyContactNumber + "', rating = '" + req.body.rating + "' where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed to update child");
          res.status(400);
      }
      else{
          res.status(200).send('Child has been updated!!');
      }
  })
};
