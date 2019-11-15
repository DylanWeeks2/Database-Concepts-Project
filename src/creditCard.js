//var myapp = require('./server.js');
//GET /setup_cc
exports.setupCreditCard = (req, res) => {
    let query = "drop table if exists creditCard";
    db.query(query, (err, result) => {
        if(err) {
            res.redirect('/');
        }
    });
    query = "create table creditCard(expDate DATE, ccNumber varchar(16), cvv varchar(4), zipCode varchar(5), parentId varchar(4) REFERENCES parentUser(id))";
    db.query(query, (err, result) => {
        if(err) { res.redirect('/'); }
        res.status(200).send('created the credit card table');
    })
}; 

//POST /save_credit_card
exports.saveCreditCard = (req, res) => {
    console.log(req.body);
    let query = "insert into creditCard values('" + req.body.expDate + "','" + req.body.ccNumber + "','" + req.body.cvv + "','" + req.body.zipCode + "','" + req.body.parentId + "')"; 
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
        if(err) {
            logger.error("failed getting credit card");
        }
        res.status(200).send('<h1>' + rows[0].expDate + rows[0].ccNumber + rows[0].cvv + rows[0].zipCode + rows[0].parentId);
    })
}