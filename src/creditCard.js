//var myapp = require('./server.js');
//GET /setup_cc
exports.setupCreditCard = (req, res) => {
    let query = "drop table if exists creditCard";
    db.query(query, (err, result) => {
        if(err) {
            res.redirect('/');
        }
    });
    query = "create table creditCard(id int not null auto_increment primary key, expDate DATE, ccNumber varchar(16), cvv varchar(4), zipCode varchar(5), parentId int REFERENCES parentUser(id))";
    db.query(query, (err, result) => {
        if(err) { res.redirect('/'); }
        res.status(200).send('created the credit card table');
    })
}; 

//POST /save_credit_card
exports.saveCreditCard = (req, res) => {
    console.log(req.body);
    let query = "insert into creditCard values(NULL,'" + req.body.expDate + "','" + req.body.ccNumber + "','" + req.body.cvv + "','" + req.body.zipCode + "','" + req.body.parentId + "')"; 
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
    let query = "select * from creditCard where parentId = '" + req.body.parentId + "'";
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