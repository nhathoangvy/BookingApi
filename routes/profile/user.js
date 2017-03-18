var User = require('../../db/user.js');
var Task = require('../../db/task.js');
var isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
      return next();
      res.redirect('/');
    }

module.exports = (router) => {
  router.get('/user', isLoggedIn, (req, res) => {
    var taskOwner = [];
    Task.find().then((thing) => {
      thing.forEach((stuff) => { if(stuff.userID == req.user._id){taskOwner.push(stuff);}});
    res.render('facebook-users', { user: req.user, tasks : taskOwner});
    });
  });
};
