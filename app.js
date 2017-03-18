var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var http = require('http');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/systems');
var users = require('./routes/users');
var hbs = require('express-handlebars');
var configDB = require('./config/connect.js');
mongoose.connect(configDB.url);
mongoose.Promise = global.Promise;
var app = express();
app.engine('html', hbs({extname: 'html', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'shhsecret',
  resave: true,
  saveUninitialized: true,
      cookie: { maxAge: (3600000 * 24)}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use('/', routes);

app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var port = (process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

server.listen(port, '127.0.0.1', (err) => {
  console.log('Port: %d', port)
});
module.exports = app;
