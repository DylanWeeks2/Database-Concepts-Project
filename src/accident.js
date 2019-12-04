exports.setupAccident = (req, res) => {
    let query = "drop table if exists `accidents`";
    db.query(query, (err, result) => {
      if(err){
        console.log("error setting up accidents", err);
        res.redirect('/');
        res.status(400);
      }
    });
    query = "CREATE TABLE accidents (driverId INT, `date` Date NOT NULL, `severity` VARCHAR(100), `type` VARCHAR(50), `descr` VARCHAR(400), FOREIGN KEY (driverId) REFERENCES driverUser(id))"
    db.query(query, (err, result) => {
      if(err) {
        console.log("error creating accidents", err);
        logger.error("failed creating driver accidents");
        res.status(400)
      }
    })
  };

exports.addAccident = (req, res) => {
    let query = `Insert into accidents (driverId, date, severity, type, descr)VALUES (${req.body.driverId}, '${req.body.date}', '${req.body.severity}', '${req.body.type}', '${req.body.descr}');`;
    console.log(query);
    db.query(query, (err, result) => {
        db.query("SELECT * FROM accidents;", (err, rows) => { console.log("All ACCIDENT ROWS", rows)});
        if(err) {
          console.log(err);
          logger.error("failed adding a accident");
          res.status(400);
        }
        else {
            res.status(200).json({
                "accident": result
              });
        }
      });
}

exports.getAccidents= (req, res) => {
    let query = `SELECT * FROM accidents where driverId = ${req.query.id};`;
    db.query(query, function(err,rows, fields) {
        if(err){
            logger.error("couldn't get driver user");
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