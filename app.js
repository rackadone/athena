// Declare Requirements
var express = require('express');
var http = require('http');
var path = require('path');
 
var app = express();
 
// Application Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set Routes
// catch methods on all urls.
app.get('/', function(req, res) {
	res.render('index', {});
});

app.all('*', function(req, res) {
  res.send(404);
});
 
http
  .createServer(app)
  .listen(
    app.get('port'),
    function(){
      console.log(
       'Express.js server listening on port ' +
        app.get('port')
      );
    }
  );