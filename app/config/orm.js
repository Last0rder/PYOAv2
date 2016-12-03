var connection = require('./connection.js');
var squel = require("squel");

// object relational mapper (ORM)
var orm = {
	
	// Finds which clue the player is currently on, which is stored in the USERS table.
	findClueNum: function (userID) {

		var queryString = squel.select().field("progression")
							   .from("USERS")
							   .where("user_id = '" + userID + "'").toString();

		connection.query(queryString, function (err, data) {

			if (err) throw err;

			var userClue = data[0].progression;

			return(userClue);

		})

	},
	

	// Checks the distance between user and location, needs to grab the clue's lat and lng from the CLUE_TABLE1 database.
	checkDist: function (userClue) {
		// craft the query string based on the player's current progression which is pulled from the previous function.
		var queryString = 'SELECT * FROM CLUE_TABLE1 WHERE clue_num = ' + userClue;
		// connection query
		connection.query(queryString, function (err, data) {
		// console.log for test
		console.log(data);
		// store the lat and lng into variables
		var	clueLat = data.lat
		var	clueLng = data.lng
		console.log("clueLat = " + clueLat + " clueLng = " + clueLng)
		})
		// Grab user's location from HTML5
		navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude
        var userLng = position.coords.longitude
        })
        // checks the distance using gps-distance npm package
        var userDistance = distance(clueLat, clueLng, userLat, userLng);
	}
};

// exports orm
module.exports = orm;
