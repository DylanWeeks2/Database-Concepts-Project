exports.setupAvailiability = (req, res) => {
    let query = "drop table if exists `availabilities`";
    db.query(query, (err, result) => {
      if(err){
        console.log("error setting up availability", err);
        res.redirect('/');
        res.status(400);
      }
    });
    query = "CREATE TABLE availabilities (driverId INT, `date` Date , `start` DATETIME, `end` DATETIME, FOREIGN KEY (driverId) REFERENCES driverUser(id))"
    db.query(query, (err, result) => {
      if(err) {
        console.log("error creating availabilities", err);
        logger.error("failed creating availabilities");
        res.status(400)
      }
    })
  };

exports.addAvailability = (req, res) => {
    let query = `Insert into availabilities (driverId, date, start, end)VALUES (${req.body.driverId}, '${req.body.date}', '${req.body.start}', '${req.body.end}');`;
    console.log(query);
    db.query(query, (err, result) => {
        db.query("SELECT * FROM availabilities;", (err, rows) => { console.log("All availabilities ROWS", rows)});
        if(err) {
          console.log(err);
          logger.error("failed adding availabilities");
          res.status(400);
        }
        else {
            res.status(200).json({
                "availability": result
              });
        }
      });
}

exports.getAvailabilities = (req, res) => {
    let query = `SELECT * FROM availabilities where driverId = ${req.query.id};`;
    console.log(query);
    db.query(query, function(err,rows, fields) {
        if(err){
            logger.error("couldn't get availabilities");
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