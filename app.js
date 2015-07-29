// Declare Requirements
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser  = require('body-parser');
var fs = require('fs');

var app = express();
app.locals.appTitle = 'PROJECT ATHENA';
 
// Application Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

// Set Routes
// catch methods on all urls.
app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/notes', function (req, res) {
  res.render('notes', {});
});

app.post('/notes/save', function (req, res, next) {
  if (!req.body.html) {
    return next(new Error('No html payload.'));
  }
  var title = req.body.title;
  var html = req.body.html;
  
  // req.collections.articles.insert(article, function(error, articleResponse) {
  //   if (error) return next(error);
  //   res.send(articleResponse);
  // });
  var filePath = 'notes/' + title;

  fs.writeFile(filePath, html, function(err) {
    if (err) {
      console.log(err);
      res.send('error saving file');
    }
    else {
      res.send('file saved');
    }
  });

});

app.all('*', function(req, res) {
  res.sendStatus(404);
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