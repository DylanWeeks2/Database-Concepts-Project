var routes = require('express').Router();
module.exports = routes;

//get /createChild
routes.get("/setupChild", function (req, res) {
    connection.query('DROP table if exists child_user', function (err, rows, fields) {
      if (err)
        logger.error("Can't drop table");
      });
    connection.query('CREATE table child_user (id varchar(4), name varchar(50), parent_name varchar(50), bio varchar(200), rating DECIMAL(19,4), parent_id varchar(4) REFERENCES parent_user(id))', function (err, rows, fields) {
      if (err)
        logger.error("Problem creating the table child_user");
    });
    res.status(200).send('The Child has been created!!');
});

//get /addChild
routes.get("/addChild/:id/:name/:parent_name/:bio/:rating/:parent_id", function (req, res) {
    connection.query('insert into child_user values(?, ?, ?, ?, ?, ?)', [req.params['id'], req.params['name'],req.params['parent_name'],req.params['bio'],req.params['rating'], req.params['parent_id']], function(err, rows, fields) {
      if(err)
        logger.error('adding row to table failed');
    });
    res.status(200).send("Child user has been added!");
  });
  
  //post /updateChild
  routes.get("/updateChild/:id/:name/:bio/:parent_name", function (req, res) {
    connection.query('update child_user set name = ?, bio = ?, parent_name = ? WHERE id = ?;', [req.params['name'], req.params['bio'], req.params['parent_name'], req.params['id']], function(err, rows, fields) {
      if(err)
        logger.error('cant update child');
    });
  });
  
  //get /viewChild
  routes.get('/viewChild/:name', (req, res) => {
    //execute a query to select * from table named data.
    connection.query('SELECT * from child_user WHERE name = ?', [req.params['name']], function (err, rows, fields) {
      if (err) {
        logger.error("Error while executing Query");
      };
      logger.info(rows[0].name + ' ' + rows[0].id + ' ' + rows[0].parent_name + ' ' + rows[0].bio + ' ' + rows[0].rating + ' ' + rows[0].parent_id);
   
      //writing to the response object
      res.type('text/html');
      res.status(200);
      res.send('<h1>' + rows[0].name + ' ' + rows[0].id + ' ' + rows[0].parent_name + ' ' + rows[0].bio + ' ' + rows[0].rating + ' ' + rows[0].parent_id + '</h1>');
    })
  });
  