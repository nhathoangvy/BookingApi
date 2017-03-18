const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const fs = require('fs');
require('./profile/user.js')(router);
fs.readdir(__dirname + "/comment/", function(err, files) {
    files.forEach(function(f) {
      require('./comment/' + f)(router);
    });
});
fs.readdir(__dirname + "/task/", function(err, files) {
    files.forEach(function(f) {
      require('./task/' + f)(router);
    });
});
require('./authFB/auth.js')(router);
require('./index.js')(router);
require('./filter.js')(router);
//require('./search.js')(router);
var app = express();
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
//all attention authorize
app.all('*', isLoggedIn, (req, res, next) => {
 var user = [req.user];
next();
});
Handlebars.registerHelper({
  if_eq : function(a, result, opts) {
    if(a === result)
        return opts.fn(this);
    else
        return opts.inverse(this);
},
header : (options) => {
  return '<ul class="menu"><li><a href="/">Home</a></li><li><a href="/user">Profile</a></li></ul>';
}
});
module.exports = router;
