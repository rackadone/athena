// Declare Requirements
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser  = require('body-parser');
var fs = require('fs');
var fileIo = require('./modules/fileIo');
var dbCalendar = require('./modules/db.calendar');

// var mongoskin = require('mongoskin');
// var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/test';
// var db = mongoskin.db(dbUrl, {safe: true});

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
  // Get list of all current files
  var files = fs.readdirSync('notes');
  res.render('notes', {files: files});
});

app.get('/calories', function (req, res) {
  // Get current date.
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  var day = today.getDay();

  // Get data for current month
  // TODO: Create module for this.
  dbCalendar.getMonth(function (data) {
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var day = today.getDay();

    res.render('calories', {
      data: data,
      date: date,
      month: month,
      year: year,
      day: day
    });
  }); 
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


//fileIo.copyFile('config/default_calendar.json', 'calendar/calendar.json');

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