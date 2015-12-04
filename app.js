var express = require('express');
var alarm = require('./alarm');
var express = require('express');
var moment = require('moment');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')

var app = express();

var HOUR_STRING = 'HH:mm';

app.use(bodyParser.urlencoded());

app.use('/', express.static('public'));

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(function (req, res, next) {
  res.locals.startTime = app.get('start-time').format(HOUR_STRING);
  res.locals.endTime = app.get('end-time').format(HOUR_STRING);
  next();
});

app.get('/', function (req, res) {
  res.render('control-panel');
});

app.post('/', function (req, res) {
  if (!req.body) {
    return res.render('control-panel', {
      error: 'No body data.'
    });
  }
  var startTime = moment(req.body['start-time'], HOUR_STRING);
  var endTime = moment(req.body['end-time'], HOUR_STRING);
  if (!startTime.isValid()) {
    return res.render('control-panel', {
      error: 'Invalid start time.'
    });
  }
  if (!endTime.isValid()) {
    return res.render('control-panel', {
      error: 'Invalid end time'
    });
  }
  if (endTime.isBefore(startTime)) {
    return res.render('control-panel', {
      error: 'End time cannot be before start time.'
    });
  }
  app.set('start-time', startTime);
  app.set('end-time', endTime);
  res.redirect('/');
});

app.set('start-time', moment('8:00', HOUR_STRING));
app.set('end-time', moment('8:30', HOUR_STRING));

app.listen(3000);
