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
  let query = "INSERT into childUser values(NULL,'" + req.body.name + "','" + req.body.bio + "','" + req.body.healthConditions + "','" + req.body.emergencyContactName + "','" + req.body.emergencyContactNumber + "','" + req.body.rating + "','" + req.body.parentId + "')"; 
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

//GET /viewChildHealthConditions
exports.getChildName = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get child name");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "name": rows[0].name
        });
      }
  })
}

//GET /viewChildHealthConditions
exports.getChildRating = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get child rating");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "rating": rows[0].rating
        });
      }
  })
}

//GET /viewChildHealthConditions
exports.getChildHealthConditions = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get healthConditions");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "healthConditions": rows[0].healthConditions
        });
      }
  })
}

//GET /viewChildEmergencyContact
exports.getChildEmergencyContactName = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get emergency contact name");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "emergencyContact": rows[0].emergencyContactName
        });
      }  
    })
}

exports.getChildEmergencyContactNumber = (req, res) => {
    let query = "select * from childUser where id = '" + req.body.id + "'";
    db.query(query, function(err,rows, fields) {
      if(err){
          logger.error("couldn't get emergency contact number");
          res.status(400).json({
            "data": [],
            "error": "MySQL error"
          });
        }
        else{
          res.status(200).json({
            "emergencyContact": rows[0].emergencyContactNumber
          });
        }  
      })
  }

//GET /viewChildBio
exports.getChildBio = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
    if(err){
        logger.error("couldn't get bio");
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "bio": rows[0].bio
        });
      }  
    })
}

//post /updateChildName
exports.updateChildName = (req, res) => {
  console.log(req.body);
  let query = "update child set name = '" + req.body.name + "' where id = '" + req.body.id + "'";
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

//post /updateChildBio
exports.updateChildBio = (req, res) => {
  console.log(req.body);
  let query = "update car set bio = '" + req.body.bio + "' where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too update child");
          res.status(400);
      }
      else{
          res.status(200).send('child has been updated!!');
      }
  })
};
  

//post /updateChildHealthConditions
exports.updateChildHealthConditions = (req, res) => {
  console.log(req.body);
  let query = "update child set name = '" + req.body.healthConditions + "' where id = '" + req.body.id + "'";
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

//post /updateChildEmergencyContactName
exports.updateChildEmergencyContactName = (req, res) => {
  console.log(req.body);
  let query = "update car set emergencyContactName = '" + req.body.emergencyContactName + "' where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too update child");
          res.status(400);
      }
      else{
          res.status(200).send('child has been updated!!');
      }
  })
};

//post /updateChildRating
exports.updateChildRating = (req, res) => {
  console.log(req.body);
  let query = "update child set rating = '" + req.body.rating + "' where id = '" + req.body.id + "'";
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

//post /updateChildEmergencyContactNumber
exports.updateChildEmergencyContactNumber = (req, res) => {
  console.log(req.body);
  let query = "update car set emergencyContactNumber = '" + req.body.emergencyContactNumber + "' where id = '" + req.body.id + "'";
  db.query(query, (err, result) => {
      if(err) {
          logger.error("failed too update child");
          res.status(400);
      }
      else{
          res.status(200).send('child has been updated!!');
      }
  })
};