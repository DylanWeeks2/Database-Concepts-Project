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
  query = "CREATE table childUser (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(50), parentName varchar(50), bio varchar(200), healthConditions varchar(200), emergencyContactName varchar(50), emergencyContactNumber varchar(50), rating DECIMAL(19,4), parentId int REFERENCES parentUser(id))";
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
  let query = "INSERT into childUser values(NULL,'" + req.body.name + "','" + req.body.parentName + "','" + req.body.bio + "','" + req.body.healthConditions + "','" + req.body.emergencyContactName + "','" + req.body.emergencyContactNumber + "','" + req.body.rating + "','" + req.body.parentId + "')"; 
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


//post /updateChild
exports.updateChild = (req, res) => {
  console.log(req.body);
  let query = "update childUser set name = " + req.body.name + "', bio ='" + req.body.bio + "',parent_name ='" + req.body.parentName + "',health_conditions='" + req.body.healthConditions + "',emergency_contact_name='" + req.body.emergencyContactName + "','" + req.body.emergencyContactName + "',emergency_contact_number='" + req.body.emergencyContactNumber + "')"; 
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

//GET /viewChild
exports.getChild = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting childUser");
      }
      res.status(200).send('<h1>' + rows[0].name + ' ' + rows[0].id + ' ' + rows[0].parentName + ' ' + rows[0].bio + ' ' + rows[0].healthConditions + ' ' + rows[0].emergencyContactName + ' ' + rows[0].emergencyContactNumber + ' ' + rows[0].rating + ' ' + rows[0].parentId + '</h1>');
  })
}

//GET /viewChildHealthConditions
exports.getChildHealthConditions = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting childUser");
      }
      res.status(200).send('<h1>' + rows[0].healthConditions + '</h1>');
  })
}

//GET /viewChildEmergencyContact
exports.getChildEmergencyContact = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting childUser");
      }
      res.status(200).send('<h1>' + 'NAME = ' +rows[0].emergencyContactName +  ' NUMBER = ' + rows[0].emergencyContactNumber +'</h1>');
  })
}

//GET /viewChildBio
exports.getChildBio = (req, res) => {
  let query = "select * from childUser where id = '" + req.body.id + "'";
  db.query(query, function(err,rows, fields) {
      if(err) {
          logger.error("failed getting childUser");
      }
      res.status(200).send('<h1>' + rows[0].bio + '</h1>');
  })
}
  