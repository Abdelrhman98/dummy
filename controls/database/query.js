
var db = require('./connection');
//var dbs = require('./dbStringUtil')
module.exports.query = (qstr, callback)=>{
        var dbClient = db.dbOpenConnection(); 
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
            dbclient.query(qstr, function (err, rows) {
                callback(rows)
                dbClient.end();
            });
        });
    }
//var test  = new dbs("hashem")
//console.log(test.select("*", {id:"123", name:"asdasd"}))