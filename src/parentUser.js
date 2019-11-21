var routes = require('express').Router();
module.exports = routes;

//GET /setup_parent
routes.get('/setup_parent', (req, res) => {
    connection.query('drop table if exists parent_user', function (err, rows, fields) {
      if (err)
        logger.error("Can't drop table");
    });
    connection.query('create table parent_user(id int primary key, name varchar(50), password varchar(50))', function (err, rows, fields) {
      if (err)
        logger.error("Problem creating the table parent_user")
    });
    connection.query('insert into parent_user values(\'1\', \'mark\', \'password\')', function(err, rows, fields) {
        if(err)
          logger.error('adding row to table failed');
    });
   
    res.status(200).send('created the parent table <p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
  });
  
//POST /change_password
routes.get('/change_password/:parent_id/:new_password', (req, res) => {
    connection.query('update parent_user set password = ? where id = ?',[req.params['new_password'], req.params['parent_id']], function (err, rows, fields) {
      if (err) {
        logger.error("failed updating password");
      };
      res.type('text/html');
      res.status(200);
      res.send('updated password');
      
    })
  });
  
  