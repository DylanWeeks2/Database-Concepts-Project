//post setupReviews
exports.setupReviews = (req, res) => {
    let query = "drop table if exists reviews";
    db.query(query, (err, result) => {
      if(err){
        res.redirect('/');
        res.status(400);
      }
    });
    query = "create table reviews(id int not null auto_increment primary key, stars int, text varchar(500), driverId int not null, FOREIGN KEY (driverId) REFERENCES driverUser(id))";
    db.query(query, (err, result) => { 
      if(err) {
        logger.error("failed creating reviews table");
        res.status(400)
      }
      else {
        res.status(200).send('added the reviews table');
      }
    })
  };

  //post addReview
  exports.addReview = (req, res) => {
    if(req.body.stars < 0 || req.body.stars > 5){
        logger.error("stars out of bounds");
    }
    let query = "insert into reviews values(NULL,'"+ req.body.stars + "','" + req.body.text + "','" + req.body.driverId+ "')";
    db.query(query, (err, result) => {
      if(err) {
        logger.error("failed adding a review");
        res.status(400);
      }
      else{
        res.status(200).send("added a review");
      }
    })
  }

//GET /getReviews
exports.getReviews = (req, res) => {
  let query = "select * from reviews where driverId = '" + req.body.driverId + "'";
  db.query(query, function(err,rows, fields) {
      if(err){
          logger.error("couldn't get driver reviews");
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