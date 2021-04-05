var mysql = require("mysql");
const host      = "localhost"
const user      = "root"
const password  = ""
const dbName    = "edara"
module.exports.host = host
module.exports.user = user
module.exports.password = password
module.exports.dbName = dbName

module.exports.dbOpenConnection = function(){
    dbclient = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: dbName
    });
    return dbclient;
}
