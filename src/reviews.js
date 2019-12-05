//post setupReviews
exports.setupReviews = (req, res) => {
    let query = "drop table if exists reviews";
    db.query(query, (err, result) => {
      if(err){
        res.status(400);
      }
    });
    query = "CREATE TABLE review ( `id` INT NOT NULL AUTO_INCREMENT, `stars` INT NOT NULL, `text` VARCHAR(500) NULL,  `driverID` INT NOT NULL, PRIMARY KEY (`id`), INDEX `driver_ID_idx` (`driverID` ASC), CONSTRAINT `driverUser`  FOREIGN KEY (`driverID`) REFERENCES `db`.`driverUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION); ";
    db.query(query, (err, result) => { 
      if(err) {
        console.log(err);
        res.status(400)
      }
      else {
        console.log("reviews Created");
      }
    })
  };

  //post addReview
  exports.addReview = (req, res) => {
    if(req.body.stars < 0 || req.body.stars > 5){
        logger.error("stars out of bounds");
    }
    let query = "insert into reviews values(NULL,'"+ req.body.stars + "','" + req.body.text + "','" + req.body.driverID+ "')";
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
  let query = "select * from reviews where driverID = '" + req.body.driverID + "'";
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