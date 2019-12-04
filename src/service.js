exports.setupService = (req, res) => {
    let query = "drop table if exists `services`";
    db.query(query, (err, result) => {
      if(err){
        console.log("error setting up services", err);
        res.redirect('/');
        res.status(400);
      }
    });
    query = "CREATE TABLE services (driverId INT, `date` Date NOT NULL, `type` VARCHAR(50), `descr` VARCHAR(400), FOREIGN KEY (driverId) REFERENCES driverUser(id))"
    db.query(query, (err, result) => {
      if(err) {
        console.log("error creating services", err);
        logger.error("failed creating driver services");
        res.status(400)
      }
    })
  };

exports.addService = (req, res) => {
    let query = `Insert into services (driverId, date, type, descr)VALUES (${req.body.driverId}, '${req.body.date}', '${req.body.type}', '${req.body.descr}');`;
    console.log(query);
    db.query(query, (err, result) => {
        db.query("SELECT * FROM services;", (err, rows) => { console.log("All SERVICE ROWS", rows)});
        if(err) {
          console.log(err);
          logger.error("failed adding a driver user");
          res.status(400);
        }
        else {
            res.status(200).json({
                "service": result
              });
        }
      });
}

exports.getServices= (req, res) => {
    let query = `SELECT * FROM services where driverId = ${req.query.id};`;
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