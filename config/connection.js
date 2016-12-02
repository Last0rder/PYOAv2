// ==============================================================================
// DATABASE CONNECTION
// Creates a connection to a database.
// ==============================================================================

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "llfc3e6v9v1r2jg4",
    password: "i779uifhwa66q8m5",
    database: "vuu63uuadz03ycq5"
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;