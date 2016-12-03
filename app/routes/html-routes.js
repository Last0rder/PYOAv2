// ===============================================================================
// ROUTING
// ===============================================================================
var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/html/index.html"));
        // console.log("Check User Location")
        // Do something here. Not sure just what yet.
    });


    app.get("/game/:userid?", function(req, res){

        res.sendFile(path.join(__dirname + "/../public/html/window.html"));
    })

    app.get("/login", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/popout.html"))
    })

    app.get("/end", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/end.html"))
    })
};