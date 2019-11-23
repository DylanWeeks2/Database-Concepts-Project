//var routes = require('express').Router();
//module.exports = routes;

//post /setupChild
exports.setupChild = (req, res) => {
  let query = "drop table if exists childUser";
  db.query(query, (err, result) => {
      if(err) {
          res.redirect('/');
      }
  });
  query = "CREATE TABLE `db`.`childUser` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `bio` VARCHAR(200) NOT NULL, `healthConditions` VARCHAR(200) NOT NULL, `emergencyContactName` VARCHAR(50) NOT NULL, `emergencyContactNumber` VARCHAR(50) NOT NULL, `rating` DECIMAL(19,4) NOT NULL, `parentID` INT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `parentID_idx` (`parentID` ASC), CONSTRAINT `parentID` FOREIGN KEY (`parentID`) REFERENCES `db`.`parentUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
  db.query(query, (err, result) => {
      if(err) { res.redirect('/'); }
      else{
        res.status(200).send('Child Table has been created.');
      }
  })

query = "alter table childUser autoIncrement = 100000"
  db.query(query, (err, result) => {
      if(err) { res.redirect('/'); }
      else{
        res.status(200).send('worked');
      }
  })

};

//post /addChild
exports.addChild = (req, res) => {
  console.log(req.body);
  let query = "INSERT into childUser values(NULL,'" + req.body.name + "','" + req.body.bio + "','" + req.body.healthConditions + "','" + req.body.emergencyContactName + "','" + req.body.emergencyContactNumber + "','" + req.body.rating + "','" + req.body.parentID + "')"; 
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too add child");
          res.status(400);
      }
      else{
          res.status(200).send('Child has been added!!');
      }
  })
};

//GET /getChild
exports.getChild = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
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
  let query = "update childUser set name = '" + req.body.name + "', bio = '" + req.body.bio + "', healthConditions = '" + req.body.healthConditions + "', emergencyContactName = '" + req.body.emergencyContactName + "', emergencyContactNumber = '" + req.body.emergencyContactNumber + "', rating = '" + req.body.rating + "' where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too update child");
          res.status(400);
      }
      else{
          res.status(200).send('Child has been updated!!');
      }
  })
};
