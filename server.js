// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require('mysql');
var orm = require('/config/orm.js');
var distance = require('gps-distance');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// BodyParser makes it possible for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// static directory
app.use(express.static('app/public'));


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// ==============================================================================
// LISTENER
// The below code effectively "starts" our server
// ==============================================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// 1. GET(/) | User visits our webpage (GET request) ---> HTML Page loading (Asking Login Through Facebook)

app.get("/", function(req, res) {
    console.log("Grab Index")
  res.sendFile(path.join(__dirname + '/app/public/startbootstrap-grayscale-gh-pages/index.html'));
});

// 2. GENERIC AUTH STUFF (FILL IN LATER)

// 3. GET(/location) | User is shown a NEW HTML page that says: "You are X meters away from the location" + Clue #1


app.get("/location", function(req, res) {
    console.log("Check User Location")
    res.sendFile(path.join(__dirname + '/app/public/startbootstrap-grayscale-gh-pages/index.html'));
    var result = distance(userlat, userlng, cluelat, cluelng);
    
});
// 4. GET (/api/:user/cluenum) | Return a JSON that specifies "which clue" the user is currently seeking
app.get("/api/:user/cluenum", function(req, res) {
    // grab userID from the route
    var userID = req.params.user;
    // run orm function to grab the user's database entry which has the current clue they are on. Then returns json.
    orm.findClueNum(userID);
});
    // {
    //     user_id: 12121313,
    //     next_clue: 3,
    //     next_clue_location: {
    //         lat: 23,
    //         lng: 12    
    //     },
    //     clue_message: "Find me at the club"
    // }

    // Extra logic in here to handle if the next_clue is 999, in which case the user "Wins".


// 5. POST (/api/clue_location) | User sends the server their current location + clue_number like the below:
app.post("/api/clue_location", function(req, res) {
    // runs orm function to check how far the user is from the current goal location.
    orm.checkDist(userClue);
});
    // {
    //     clue_num: 3,
    //     user_current_location: {
    //         lat: 41
    //         lng: 21
    //     }
    // } 

    // Server return a JSON that says below (inside route exists the logic to calculate the distance)

    // { 
    //     user_current_location: {
    //         lat: 41
    //         lng: 21
    //     },

    //     clue_location: {
    //         lat: 23,
    //         lng: 12
    //     },

    //     distance: 212
    // }

    // If distance = 20 then change the user table and do some crazy stuff like redirect the user.

// --------------------------

// USERS_TABLE
// USER_ID (FB) | Real Name | CLUE_NUM 
// 1231312     | Ahmed Haque | 1 

// CLUE_LOCATION_TABLE
// CLUE_NUM    | LAT   | LNG   | MESSAGE
// 1           | 23    | 12    | "Find me at the club"

// */  