//var myapp = require('./server.js');
//GET /setup_cc
exports.setup_cc = (req, res) => {
    let query = "drop table if exists creditCard";
    db.query(query, (err, result) => {
        if(err) {
            res.redirect('/');
        }
    });
    query = "create table creditCard(expdate DATE, cc_number varchar(16), cvv varchar(4), zip_code varchar(5), parent_id varchar(4) REFERENCES parent_user(id))";
    db.query(query, (err, result) => {
        if(err) { res.redirect('/'); }
        res.status(200).send('created the credit card table');
    })
}; 

//POST /save_credit_card
exports.saveCreditCard = (req, res) => {
    console.log(req.body);
    let query = "insert into creditCard values('" + req.body.expdate + "','" + req.body.cc_number + "','" + req.body.cvv + "','" + req.body.zip_code + "','" + req.body.parent_id + "')"; 
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
    let query = "select * from creditCard where parent_id = '" + req.body.parent_id + "'";
    db.query(query, function(err,rows, fields) {
        if(err) {
            logger.error("failed getting credit card");
        }
        res.status(200).send('<h1>' + rows[0].expdate + rows[0].cc_number + rows[0].cvv + rows[0].zip_code + rows[0].parent_id);
    })
}