//var myapp = require('./server.js');
//GET /setup_cc
exports.setupCreditCard = (req, res) => {
    let query = "drop table if exists creditCard";
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }
    });
    query = "CREATE TABLE `creditCard` ( `id` INT NOT NULL AUTO_INCREMENT,  `expDate` DATE ,  `ccNumber` VARCHAR(16) , `cvv` VARCHAR(4) , `zipCode` VARCHAR(5) , `parentID` INT NOT NULL, PRIMARY KEY (`id`), INDEX `parentID_idx` (`parentID` ASC),  UNIQUE INDEX `id_UNIQUE` (`id` ASC), CONSTRAINT `parentIDKey` FOREIGN KEY (`parentID`)  REFERENCES `db`.`parentUser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION); ";
    db.query(query, (err, result) => {
        if(err) { console.log(err); }
        else{
            console.log("Credit Card Created");
        }
    })
}; 

//POST /save_credit_card
exports.saveCreditCard = (req, res) => {
    console.log(req.body);
    let query = "insert into creditCard values(NULL,'" + req.body.expDate + "','" + req.body.ccNumber + "','" + req.body.cvv + "','" + req.body.zipCode + "','" + req.body.parentID + "')"; 
    db.query(query, (err, result) => {
        if(err) {
            logger.error("failed saving new credit card");
            res.status(400);
        }
        else{
            res.status(200).send('added the credit card');
        }
    })
};

//GET /getCreditCard
exports.getCreditCard = (req, res) => {
    let query = "select * from creditCard where parentId = '" + req.body.parentID + "'";
    db.query(query, function(err,rows, fields) {
        if(err){
            logger.error("couldn't get credit card");
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