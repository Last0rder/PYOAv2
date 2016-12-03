// ===============================================================================
// DEPENDENCIES 
// ===============================================================================
var connection = require('../config/connection.js');
var squel = require("squel");
var distance = require('gps-distance');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // Create new users
    app.post("/api/create", function(req, res){

        // {"userID": "_________"}
        
        userID = req.body.userID;
        var queryString = squel.insert().into("USERS")
                                        .set("user_id", userID)
                                        .set("facebook_id", "111111")
                                        .set("progression", "1").toString();

        console.log(queryString);
        connection.query(queryString, function (err, data) {
            if (err) throw err;

            res.json({"success": true})
        })
    });



    // Determine which "clue" the user is currently seeking
    app.get("/api/:userid", function(req, res){

        // Grab the user id from the URL
        userID = req.params.userid;

        // Build the MySQL query
        var queryString = squel.select().field("progression")
                               .from("USERS")
                               .where("user_id = '" + userID + "'").toString();

        // Run the query
        connection.query(queryString, function (err, data) {

            if (err) throw err;

            var userClue = data[0].progression;

            // Run a SECOND query to determine the message associated with that clue.
            var queryString = squel.select()
                                    .field("message")
                                    .field("img")
                                    .from("CLUES")
                                    .where("clue_num = '" + userClue + "'").toString()

            // Run the next connection 
            connection.query(queryString, function(err, data){

                var message = data[0].message;
                var img = data[0].img

                res.json({"clue_num": userClue, "message": message, "img": img})

            })

        })
    })

    app.post("/api/location", function(req, res){

        // User's Current Location, User's Clue Number
        /*
            {
                "userID": XXX, 
                "lat": XXX,
                "lng": XXX,
                "clue": 1
            }
        */ 
        var userData = req.body;
        var userID = req.body.userID;
        var currentLat = userData.lat;
        var currentLng = userData.lng
        var currentClue = parseInt(userData.clue);

        // Identify the lat/lng of the current clue
        var queryString = squel.select()
                                .field("lat")
                                .field("lng")
                                .from("CLUES")
                                .where("clue_num = '" + currentClue + "'").toString()


        // Retrieve the Lat and Longitude of the clue's location
        connection.query(queryString, function(err, data){

            var clueLat = data[0].lat;
            var clueLng = data[0].lng;

            var distanceAway = distance(clueLat, clueLng, currentLat, currentLng) 

            if (distanceAway < 0.5) {

                // If the level is 4 then...
                if (currentClue == 4){
                    res.json({"success": true, "distance": distanceAway, "win": true})
                }

                else {
                    // If within range, update the progression data
                    var queryString = squel.update()
                                            .table("USERS")
                                            .set("progression", currentClue + 1)
                                            .where("user_id = '" + userID + "'" ).toString();

                    connection.query(queryString, function(err, data){

                        res.json({"success": true, "distance": distanceAway, "win": false});

                    })
                }

            }

            else {
                res.json({"success": false, "distance": distanceAway, "win": false})
            }
        })

    });
}   
