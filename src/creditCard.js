var routes = require('express').Router();
module.exports = routes;

//GET /setup_cc
routes.get('/setup_cc', (req, res) => {
    connection.query('drop table if exists credit_card', function (err, rows, fields) {
        if (err)
            logger.error("Can't drop table");
        });
    connection.query('create table credit_card(expdate DATE, cc_number varchar(16), cvv varchar(4), zip_code varchar(5), parent_id varchar(4) REFERENCES parent_user(id))', function(err, rows, fields) {
        if (err)
            logger.error("Problem creating the table credit_card")
    });
    connection.query('insert into credit_card values(\'06-22-24\', \'0000000000000000\', \'999\', \'11111\' \'1\')', function(err, rows, fields) {
        if(err)
            logger.error('adding row to table failed');
        }); 
    res.status(200).send('created the credit card table');
}); 

//POST /save_credit_card
routes.get('/save_credit_card:parent_id/:expdate/:cc_number/:cvv/:zip_code', (req, res) => {
    connection.query('insert into credit_card values ?, ?, ?, ?, ?', [req.params['expdate'], req.params['cc_number'], req.params['cvv'], req.params['zip_code'], requ.params['parent_id']], function (err, rows, fields) {
        if(err) {
            logger.error("failed saving new credit card");
        };
    })
});