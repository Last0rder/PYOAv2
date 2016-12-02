var connection = require('./connection.js');

// object relational mapper (ORM)
var orm = {
	
	// Finds which clue the player is currently on, which is stored in the PLAYERS database.
	findClueNum: function (userID) {
		// craft the query string based on the userID pulled from URL req.params
		var queryString = 'SELECT * FROM PLAYERS WHERE id = ' + userID;
		// connection query
		connection.query(querystring, function (err, data) {
		if (err) throw (err);
		// store the user's progression/clue number into var userClue for further use
		var userClue = data.progression;
		// console.log to test
		console.log(data);
		// return data as a json
	    res.json(data);
		})
	};

	// Checks the distance between user and location, needs to grab the clue's lat and lng from the CLUE_TABLE1 database.
	checkDist: function (userClue) {
		// craft the query string based on the player's current progression which is pulled from the previous function.
		var queryString = 'SELECT * FROM CLUE_TABLE1 WHERE clue_num = ' + userClue;
		// connection query
		connection.query(querystring, function (err, data) {
		if (err) throw (err);
		// console.log for test
		console.log(data);
		// store the lat and lng into variables
		var	clueLat = data.lat,	
		var	clueLng = data.lng
		}
		// Grab user's location from HTML5
		navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude,
        var userLng = position.coords.longitude
        };
        // checks the distance using gps-distance npm package
        var userDistance = distance(clueLat, clueLng, userLat, userLng);
	}
};

// exports orm
module.exports = orm;
