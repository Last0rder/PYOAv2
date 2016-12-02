var path = require('path');

module.exports = function(app){

app.get("/", function(req, res) {
	console.log("Path Success")
  res.sendFile(path.join(__dirname + '/../app/public/startbootstrap-grayscale-gh-pages/index.html'));
});

}